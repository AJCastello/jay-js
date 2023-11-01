import { getRoute } from "./getRoute";

export function Navigate(path: string) {
  history.pushState(null, "", path);
  getRoute();
}