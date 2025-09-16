import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import MagicString from 'magic-string';
import type { ComponentMetadata, InstrumentedCallExpression } from './types.js';
import { isJayJsComponent, getLineAndColumn, getDebugFunctionName } from '../utils/index.js';

/**
 * Transform source code to instrument Jay JS component calls with debug metadata
 */
export function transformSource(source: string, filename: string): string | null {
  try {
    // Parse the source code
    const ast = parse(source, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });

    const instrumentedCalls: InstrumentedCallExpression[] = [];
    
    // Traverse AST to find Jay JS component calls
    traverse(ast, {
      CallExpression(path) {
        const { node } = path;
        
        // Check if this is a direct function call to a Jay JS component
        if (t.isIdentifier(node.callee) && isJayJsComponent(node.callee.name)) {
          const { line, column } = getLineAndColumn(source, node.start || 0);
          
          const metadata: ComponentMetadata = {
            component: node.callee.name,
            file: filename,
            line,
            column,
          };
          
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

    // Use MagicString to modify the source code
    const magicString = new MagicString(source);
    
    // Sort by position (descending) to avoid offset issues
    instrumentedCalls.sort((a, b) => b.start - a.start);
    
    // Replace each component call with instrumented version
    for (const call of instrumentedCalls) {
      const debugCode = `${getDebugFunctionName()}(${call.originalCall}, ${JSON.stringify(call.metadata)})`;
      magicString.overwrite(call.start, call.end, debugCode);
    }
    
    // Add debug function import at the top of the file
    const importStatement = `import { ${getDebugFunctionName()} } from '@jay-js/inspector/runtime';\n`;
    magicString.prepend(importStatement);
    
    return magicString.toString();
    
  } catch (error) {
    console.warn(`[jayjs-inspector] Failed to transform ${filename}:`, error);
    return null;
  }
}