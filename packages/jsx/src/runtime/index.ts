/**
 * @file JSX Runtime index
 * @description Exports both production and development JSX runtime functions
 */

// Export production JSX runtime
export * from "./jsx-runtime.js";

// Export development JSX runtime
export { jsxDEV } from "./jsx-dev-runtime.js";