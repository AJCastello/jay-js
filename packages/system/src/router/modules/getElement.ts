import { IRouteInstance } from "../types";
import { routerOptions } from "./routerDefineOptions";

export async function getElement(route: IRouteInstance) {
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