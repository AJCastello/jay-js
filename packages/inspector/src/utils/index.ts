import type { ComponentMetadata } from "../plugin/types.js";

/**
 * List of Jay JS component names to instrument
 */
export const JAYJS_COMPONENTS = [
	"Base",
	"Box",
	"Button",
	"Typography",
	"Input",
	"TextInput",
	"TextArea",
	"Checkbox",
	"Radio",
	"Select",
	"SelectItem",
	"Form",
	"Link",
	"Img",
	"List",
	"ListItem",
	"Section",
	"Progress",
	"Range",
	"FileInput",
	"Fragment",
	"Outlet",
] as const;

/**
 * Check if a function name is a Jay JS component
 */
export function isJayJsComponent(name: string): boolean {
	return JAYJS_COMPONENTS.includes(name as any);
}

/**
 * Generate unique debug function name
 */
export function getDebugFunctionName(): string {
	return "__jayjs_debug__";
}

/**
 * Generate debug code for component metadata
 */
export function generateDebugCode(metadata: ComponentMetadata): string {
	const metadataStr = JSON.stringify(metadata);
	return `${getDebugFunctionName()}(ORIGINAL_CALL, ${metadataStr})`;
}

/**
 * Extract line and column from position in source code
 */
export function getLineAndColumn(source: string, position: number): { line: number; column: number } {
	const lines = source.substring(0, position).split("\n");
	return {
		line: lines.length,
		column: lines[lines.length - 1].length + 1,
	};
}

/**
 * Convert glob pattern to regex pattern
 */
function globToRegex(pattern: string): RegExp {
	// Handle brace expansion like {ts,tsx}
	let processed = pattern.replace(/\{([^}]+)\}/g, (match, content) => {
		return `(${content.split(',').join('|')})`;
	});

	// Escape special regex characters except * and ?
	processed = processed
		.replace(/[.+^$|[\]\\]/g, '\\$&')  // Don't escape parentheses since we use them for groups
		.replace(/\*\*/g, '___DOUBLESTAR___')
		.replace(/\*/g, '[^/]*')
		.replace(/___DOUBLESTAR___/g, '.*')
		.replace(/\?/g, '[^/]');

	return new RegExp(`^${processed}$`);
}

/**
 * Create filter function for include/exclude patterns
 */
export function createFileFilter(include?: string[], exclude?: string[]): (id: string) => boolean {
	return (id: string) => {
		// Always exclude node_modules
		if (id.includes("node_modules")) return false;

		// Check exclude patterns first
		if (exclude?.some((pattern) => globToRegex(pattern).test(id))) {
			return false;
		}

		// Check include patterns (if specified)
		if (include?.length) {
			return include.some((pattern) => globToRegex(pattern).test(id));
		}

		// Default: include .ts, .tsx, .js, .jsx files
		return /\.(ts|tsx|js|jsx)$/.test(id);
	};
}
