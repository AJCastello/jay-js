import { getRoute } from "./getRoute.js";
import { routerOptions } from "./routerDefineOptions.js";

export function Navigate(path: string) {
  const prefixOptions = routerOptions.prefix || "";

  if(prefixOptions){
    path = [prefixOptions, path].join("/").replace(/\/+$/, "").replace(/\/{2,}/g, "/");
  }

  history.pushState(null, "", path);
  getRoute();
}