import { IRouteInstance } from "../types";
import { renderRoute } from "./renderRoute";
import { resolvedRoutes } from "./routerDefineOptions";

export async function getTarget(route: IRouteInstance) {
  if (route.parentLayoutId) {
    const parentLayout = document.querySelector(`[data-layout-id="${route.parentLayoutId}"]`);

    if (parentLayout) {
      const outlet = parentLayout.querySelector(`[data-router="outlet"]`);
      if (outlet) {
        return outlet;
      }
    }

    if (!parentLayout) {
      const parentLayoutRoute = resolvedRoutes.get(route.parentLayoutId);
      if (parentLayoutRoute) {
        const parentLayoutRouteRendered = await renderRoute(parentLayoutRoute);
        if (parentLayoutRouteRendered) {
          const outlet = parentLayoutRouteRendered.querySelector(`[data-router="outlet"]`);
          if (outlet) {
            return outlet;
          }
        }
      }
    }
  }

  return route.target;
}