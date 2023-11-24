import { getRoute } from "./getRoute.js";

export function Navigate(path: string) {
  history.pushState(null, "", path);
  getRoute();
}