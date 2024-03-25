import { uniKey } from "../../utils/uniKey.js";
import { IRoute, IRouteInstance } from "../types/index.js";
import { routerOptions } from "./routerDefineOptions.js";

export function Routes(inputRoutes: Array<IRoute>, target?: HTMLElement, prefix = ""): Array<IRouteInstance> {
  const outputRoutes: Array<IRouteInstance> = [];

  const prefixOptions = routerOptions.prefix || "";

  function buildRoutes(routes: Array<IRoute>, prefix: string, parentLayoutId?: string) {

    if (prefixOptions && prefix.includes(prefixOptions)) {
      prefix = prefix.replace(prefixOptions, "");
    }

    for (const route of routes) {
      const newPath = [prefixOptions, prefix, route.path].join("/").replace(/\/+$/, "").replace(/\/{2,}/g, "/");
      const routeId = uniKey();

      if (route.element) {
        const routeBuild: IRouteInstance = {
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
        buildRoutes(route.children, newPath, (route.layout ? routeId : parentLayoutId));
      }
    }
  }

  buildRoutes(inputRoutes, prefix);
  return outputRoutes;
}