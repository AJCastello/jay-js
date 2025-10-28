/**
 * @file Main entry point for the JSX package
 * @description Provides JSX runtime functions and TypeScript declarations for Jay JS
 */

// Export the JSX namespace for TypeScript
declare namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
	}
}

// Re-export all JSX runtime components
export * from "./runtime/index.js";

// Export the Vite plugin
export { default as jayJsxPlugin } from "./vite-plugin/index.js";

// Ensure TypeScript recognizes this as a module
export default {};
