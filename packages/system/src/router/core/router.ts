import type { TRoute, TRouterOptions } from "../types";
import { resolvedRoutes, routerDefineOptions } from "./configuration";
import { getRoute } from "./navigation/get-route";
import { Routes } from "./route-registry";

/**
 * Initializes the router with the specified routes and configuration
 *
 * The Router function is the main entry point for setting up the routing system.
 * It processes route definitions, registers them, and triggers the initial route resolution.
 *
 * @param {Array<TRoute>} routes - Array of route configurations defining the application's routing structure
 * @param {TRouterOptions} [options] - Optional configuration options for customizing router behavior
 * @throws {Error} Throws an error if no routes are provided and no error handler is configured
 *
 * @example
 * Router([
 *   {
 *     path: '/',
 *     element: () => document.createTextNode('Home page'),
 *     target: document.getElementById('content')
 *   },
 *   {
 *     path: '/about',
 *     element: () => document.createTextNode('About page')
 *   }
 * ], {
 *   prefix: '/app',
 *   onError: (err) => console.error('Router error:', err)
 * });
 */
export function Router(routes: Array<TRoute>, options?: TRouterOptions) {
	if (options) {
		routerDefineOptions(options);
	}

	if (routes.length === 0) {
		if (options?.onError) {
			options.onError(new Error("No routes provided", { cause: "no-routes" }));
			return;
		}
		throw new Error("No routes provided", { cause: "no-routes" });
	}

	resolvedRoutes.clear();

	for (const route of Routes(routes, options?.target)) {
		resolvedRoutes.set(route.id, route);
	}

	getRoute();
}
