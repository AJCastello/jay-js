import { routerDefineOptions } from "../core/configuration";

/**
 * Sets a callback function to be executed when navigation occurs
 * @param {Function} callback - Function to be called when navigation occurs
 */
export function onNavigate(callback: () => void) {
	routerDefineOptions({ onNavigate: callback });
}

/**
 * Converts a route path to a regular expression pattern
 * @param {string} path - The route path to convert
 * @returns {RegExp} A regular expression that matches the route path
 */
export function pathToRegex(path: string) {
	return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "([^/]+)") + "$");
}
