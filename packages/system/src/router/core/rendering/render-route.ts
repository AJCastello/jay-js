import { TRouteInstance } from "../../types";
import { routerOptions, resolvedRoutes } from "../configuration";

export async function renderRoute(route: TRouteInstance): Promise<HTMLElement | undefined> {
  if (route.element && route.target) {
    const target = await getTarget(route);
    const element = await getElement(route);

    if (!element || !target) return;

    target.innerHTML = "";
    target.append(element as HTMLElement);
    return target as HTMLElement;
  }
  return;
}


export async function getElement(route: TRouteInstance) {
  try {
    if (route && route.element) {
      if (typeof route.element === "function" && route.element instanceof Promise) {
        const element = await route.element() as HTMLElement;
        if (route.layout) {
          element.dataset.layoutId = route.id;
        }
        return element;
      }

      if (typeof route.element === "function") {
        const element = route.element() as HTMLElement;
        if (route.layout) {
          element.dataset.layoutId = route.id;
        }
        return element;
      }

      const element = route.element as HTMLElement;
      if (route.layout) {
        element.dataset.layoutId = route.id;
      }
      return element;
    }
  } catch (error) {
    if (routerOptions.onError) {
      console.error(error);
      routerOptions.onError(new Error("Error rendering route", { cause: "render-route" }));
      return;
    }
    throw error;
  }
}


export async function getTarget(route: TRouteInstance) {
  if (route.parentLayoutId) {
    const parentLayout = document.querySelector(`[data-layout-id="${route.parentLayoutId}"]`);

    if (parentLayout) {
      const outlet = parentLayout.querySelector("[data-router=\"outlet\"]");
      if (outlet) {
        return outlet;
      }
    }

    if (!parentLayout) {
      const parentLayoutRoute = resolvedRoutes.get(route.parentLayoutId);
      if (parentLayoutRoute) {
        const parentLayoutRouteRendered = await renderRoute(parentLayoutRoute);
        if (parentLayoutRouteRendered) {
          const outlet = parentLayoutRouteRendered.querySelector("[data-router=\"outlet\"]");
          if (outlet) {
            return outlet;
          }
        }
      }
    }
  }

  return route.target;
}