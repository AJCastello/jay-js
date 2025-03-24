import { uniKey } from "../../utils";
import { selector } from "../../utils/dom/query";
import type { TRoute, TRouteInstance } from "../types";
import { routerOptions } from "./configuration";

/**
 * Processes and registers route definitions for the router
 * 
 * This function transforms the user-provided route definitions into internal route instances
 * that the router can work with. It handles nested routes, layouts, and target resolution.
 * 
 * @param {Array<TRoute>} inputRoutes - Array of route configurations to register
 * @param {HTMLElement|string} [target] - Default rendering target for routes that don't specify their own
 * @param {string} [prefix=''] - Path prefix to prepend to all routes in this set
 * @returns {Array<TRouteInstance>} Array of processed route instances
 */
export function Routes(inputRoutes: Array<TRoute>, target?: HTMLElement | string, prefix = ""): Array<TRouteInstance> {
	const outputRoutes: Array<TRouteInstance> = [];
	const prefixOptions = routerOptions.prefix || "";

	function buildRoutes(routes: Array<TRoute>, prefix: string, parentLayoutId?: string) {
		if (prefixOptions && prefix.includes(prefixOptions)) {
			prefix = prefix.replace(prefixOptions, "");
		}

		for (const route of routes) {
			const newPath = [prefixOptions, prefix, route.path]
				.join("/")
				.replace(/\/+$/, "")
				.replace(/\/{2,}/g, "/");
			const routeId = uniKey();

			if (route.element) {
				let routeTarget = route.target || target || document.body;
				if (typeof routeTarget === "string") {
					const targetElement = selector(routeTarget);
					if (!targetElement && routerOptions.onError) {
						routerOptions.onError(new Error(`Target element not found: ${routeTarget}`, { cause: "invalid-target" }));
						routeTarget = document.body;
					} else if (targetElement) {
						routeTarget = targetElement;
					}
				}

				const routeBuild: TRouteInstance = {
					id: routeId,
					path: newPath,
					element: route.element,
					target: routeTarget as HTMLElement,
				};

				route.layout && (routeBuild.layout = route.layout);
				parentLayoutId && (routeBuild.parentLayoutId = parentLayoutId);
				outputRoutes.push(routeBuild);
			}

			if (route.children) {
				buildRoutes(route.children, newPath, route.layout ? routeId : parentLayoutId);
			}
		}
	}

	buildRoutes(inputRoutes, prefix);
	return outputRoutes;
}
