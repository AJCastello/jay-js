import { routerOptions } from "../configuration";
import { getRoute } from "./get-route";

/**
 * Navigates to a specified path programmatically
 * 
 * This function updates the browser URL and triggers route resolution without requiring a full page reload.
 * If a prefix is configured in the router options, it will be automatically applied to the path.
 * 
 * @param {string} path - The target path to navigate to (without the prefix)
 * 
 * @example
 * // Navigate to the about page
 * Navigate('/about');
 * 
 * // With a configured prefix of '/app', this would navigate to '/app/about'
 */
export function Navigate(path: string) {
	const prefixOptions = routerOptions.prefix || "";

	if (prefixOptions) {
		path = [prefixOptions, path]
			.join("/")
			.replace(/\/+$/, "")
			.replace(/\/{2,}/g, "/");
	}

	history.pushState(null, "", path);
	getRoute();
}
