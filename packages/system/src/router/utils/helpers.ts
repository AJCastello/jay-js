import { compile, match, pathToRegexp } from "path-to-regexp";

/**
 * Converts a route path to a regular expression pattern
 * @param {string} path - The route path to convert
 * @returns {RegExp} A regular expression that matches the route path
 */
export function pathToRegex(path: string) {
	return pathToRegexp(path);
}

/**
 * Creates a matcher function for a path pattern
 * @param {string} path - The route path pattern
 * @returns A matcher function that returns match information or null
 */
export function createMatcher(path: string) {
	return match(path, { decode: decodeURIComponent });
}

/**
 * Creates a path generator function from a pattern
 * @param {string} path - The route path pattern
 * @returns A function that generates paths from parameters
 */
export function createPathGenerator(path: string) {
	return compile(path, { encode: encodeURIComponent });
}
