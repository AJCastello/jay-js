import { TRouterOptions, TRouteInstance } from "../types";

export const routerOptions: TRouterOptions = {
  prefix: "",
  target: document.body,
  onError: console.error,
  onNavigate: () => {},
  beforeResolve: () => true,
};

export const resolvedRoutes = new Map<string, TRouteInstance>();

export function routerDefineOptions(options: Partial<TRouterOptions>) {
  Object.assign(routerOptions, options);
}