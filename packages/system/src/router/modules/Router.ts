import { IRoute, IRouterOptions } from "../types/index.js";
import { Routes } from "./Routes.js";
import { getRoute } from "./getRoute.js";
import { resolvedRoutes, routerDefineOptions } from "./routerDefineOptions.js";

export function Router(routes: Array<IRoute>, options?: IRouterOptions) {
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
