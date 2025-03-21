import { uniKey } from "../../utils";
import { selector } from "../../utils/dom/query";
import type { TRoute, TRouteInstance } from "../types";
import { routerOptions } from "./configuration";

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
