import { uniKey } from "../../utils";
import type { TRoute, TRouteInstance } from "../types";
import { routerOptions } from "./configuration";

export function Routes(inputRoutes: Array<TRoute>, target?: HTMLElement, prefix = ""): Array<TRouteInstance> {
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
				const routeBuild: TRouteInstance = {
					id: routeId,
					path: newPath,
					element: route.element,
					target: route.target || target || document.body,
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
