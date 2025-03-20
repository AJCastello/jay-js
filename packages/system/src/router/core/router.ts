import type { TRoute, TRouterOptions } from "../types";
import { resolvedRoutes, routerDefineOptions } from "./configuration";
import { getRoute } from "./navigation/get-route";
import { Routes } from "./route-registry";

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
