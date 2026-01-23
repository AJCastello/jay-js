/**
 * @file Main entry point for the JSX package
 * @description Provides JSX runtime functions and TypeScript declarations for Jay JS
 */

// Export development JSX runtime
export { jsxDEV } from "./core/jsx-dev-runtime.js";

// Export production JSX runtime
export * from "./core/jsx-runtime.js";

// Export JSX types
export { JSX } from "./types/intrinsic-elements.js";

// Ensure TypeScript recognizes this as a module
export default {};
