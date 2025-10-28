import { selector } from "../../utils/dom/query";
import type { TRouteInstance, TRouterOptions } from "../types";

/**
 * Default configuration options for the router
 * @type {TRouterOptions}
 */
export const routerOptions: TRouterOptions = {
	prefix: "",
	target: document.body,
	onError: console.error,
	beforeResolve: () => true,
};

/**
 * Map of resolved routes indexed by their unique IDs
 * @type {Map<string, TRouteInstance>}
 */
export const resolvedRoutes = new Map<string, TRouteInstance>();

/**
 * Configures the router with the specified options
 *
 * This function allows customizing router behavior by providing configuration options.
 * It handles special cases like resolving string targets to DOM elements.
 *
 * @param {Partial<TRouterOptions>} options - Partial router configuration options
 * @returns {void}
 *
 * @example
 * routerDefineOptions({
 *   prefix: '/app',
 *   target: '#content',
 *   onError: (err) => showErrorToast(err.message)
 * });
 */
export function routerDefineOptions(options: Partial<TRouterOptions>) {
	if (typeof options.target === "string") {
		const targetElement = selector(options.target);
		if (!targetElement) {
			if (options.onError) {
				options.onError(new Error(`Target element not found: ${options.target}`, { cause: "invalid-target" }));
			}
			return;
		}
		options.target = targetElement;
	}
	Object.assign(routerOptions, options);
}
