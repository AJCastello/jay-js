import { parse } from "@babel/parser";
import type { NodePath } from "@babel/traverse";
import * as traverse from "@babel/traverse";
import * as t from "@babel/types";
import MagicString from "magic-string";
import { DebugReporter } from "../utils/debug-reporter.js";
import { getDebugFunctionName, getLineAndColumn, isJayJsComponent } from "../utils/index.js";
import type { ComponentMetadata, InstrumentedCallExpression } from "./types.js";

/**
 * Transform source code to instrument Jay JS component calls with debug metadata
 * JayJS uses factory functions that return HTMLElements, so we need to wrap the call
 * and instrument the returned element.
 */
export function transformSource(source: string, filename: string): string | null {
	const reporter = DebugReporter.getInstance();

	try {
		reporter.addFileProcessed(filename, false); // Initially mark as not transformed

		// Parse the source code
		const ast = parse(source, {
			sourceType: "module",
			plugins: ["typescript", "jsx"],
		});

		const instrumentedCalls: InstrumentedCallExpression[] = [];

		// Traverse AST to find Jay JS component calls
		const traverseFn = (traverse as any).default?.default || (traverse as any).default || traverse;
		traverseFn(ast, {
			CallExpression(path: NodePath<t.CallExpression>) {
				const { node } = path;

				// Check if this is a direct function call to a Jay JS component
				if (t.isIdentifier(node.callee) && isJayJsComponent(node.callee.name)) {
					const { line, column } = getLineAndColumn(source, node.start || 0);

					const metadata: ComponentMetadata = {
						component: node.callee.name,
						file: filename,
						line,
						column,
						sourceLocation: {
							start: node.start || 0,
							end: node.end || 0,
						},
					};

					// Report detected component
					reporter.addDetectedComponent(node.callee.name, filename, line, column);

					instrumentedCalls.push({
						originalCall: source.substring(node.start || 0, node.end || 0),
						metadata,
						start: node.start || 0,
						end: node.end || 0,
					});
				}
			},
		});

		// If no Jay JS components found, return null (no transformation needed)
		if (instrumentedCalls.length === 0) {
			return null;
		}

		// Update reporter - file will be transformed
		reporter.addFileProcessed(filename, true);

		// Use MagicString to modify the source code
		const magicString = new MagicString(source);

		// Sort by position (ascending) to transform innermost components first
		instrumentedCalls.sort((a, b) => b.start - a.start);

		// Replace each component call with instrumented version
		// JayJS factory functions return HTMLElement, so we need to instrument the result
		for (let i = 0; i < instrumentedCalls.length; i++) {
			const call = instrumentedCalls[i];
			try {
				const debugCode = `${getDebugFunctionName()}(${call.originalCall}, ${JSON.stringify(call.metadata)})`;
				magicString.overwrite(call.start, call.end, debugCode);
				for (let j = 0; j < instrumentedCalls.length; j++) {
					if (j === i) continue;
					if (instrumentedCalls[j].originalCall.includes(call.originalCall)) {
						instrumentedCalls[j].originalCall = instrumentedCalls[j].originalCall.replace(call.originalCall, debugCode);
						// 		const diff = debugCode.length - call.originalCall.length;
						// 		instrumentedCalls[j].start += diff;
						// 		instrumentedCalls[j].end += diff;
						//    nextCall.end += debugCode.length - call.originalCall.length;
					}
				}
			} catch (replaceError) {
				reporter.addTransformationError(
					filename,
					`Failed to replace call for ${call.metadata.component}: ${replaceError}`,
					call.metadata.line,
				);
			}
		}

		const importStatement = `import { ${getDebugFunctionName()} } from '@jay-js/inspector/runtime';\n`;
		magicString.prepend(importStatement);

		const transformedCode = magicString.toString();

		// Validate the transformation
		try {
			parse(transformedCode, {
				sourceType: "module",
				plugins: ["typescript", "jsx"],
			});
		} catch (validationError) {
			reporter.addTransformationError(filename, `Generated invalid code: ${validationError}`, undefined);
			return null;
		}

		return transformedCode;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		reporter.addTransformationError(filename, `Parse/transform error: ${errorMessage}`);
		return null;
	}
}
