import { routerDefineOptions } from "../core/configuration";

/**
 * Converts a route path to a regular expression pattern
 * @param {string} path - The route path to convert
 * @returns {RegExp} A regular expression that matches the route path
 */
export function pathToRegex(path: string) {
	return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "([^/]+)") + "$");
}
