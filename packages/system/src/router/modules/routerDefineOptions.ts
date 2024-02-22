import { IRouteInstance, IRouterOptions } from "../types/index.js";

export let routerOptions: IRouterOptions = {
  target: document.body
};

//export const resolvedRoutes: Array<IRouteInstance> = [];
export const resolvedRoutes = new Map<string, IRouteInstance>();

export function routerDefineOptions(options: Partial<IRouterOptions>) {
  routerOptions = { ...routerOptions, ...options };
  return routerOptions;
}