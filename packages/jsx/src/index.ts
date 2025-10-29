/**
 * @file Main entry point for the JSX package
 * @description Provides JSX runtime functions and TypeScript declarations for Jay JS
 */

// Re-export all JSX runtime components
export * from "./runtime/index.js";

// Export JSX types
export { JSX } from "./types/intrinsic-elements.js";

// Ensure TypeScript recognizes this as a module
export default {};
