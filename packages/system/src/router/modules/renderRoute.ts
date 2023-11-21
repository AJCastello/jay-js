import { IRouteInstance } from "../types/index.js";
import { getElement } from "./getElement.js";
import { getTarget } from "./getTarget.js";

export async function renderRoute(route: IRouteInstance): Promise<HTMLElement | undefined> {
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
