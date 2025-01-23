import { getPotentialMatch } from "./getPotentialMatch.js";
import { getPotentialMatchIndex } from "./getPotentialMatchIndex.js";
import { renderRoute } from "./renderRoute.js";
import { routerOptions } from "./routerDefineOptions.js";

export async function getRoute() {
  const match = getPotentialMatch();

  if (routerOptions.beforeResolve) {
    const beforeResolve = await routerOptions.beforeResolve(match.route);
    if (!beforeResolve) {
      return;
    }
  }

  if (!match.result) {
    if (routerOptions.onError) {
      routerOptions.onError(new Error("No match found", { cause: "no-match" }));
      return;
    }
    return;
  }

  if (match.route.layout) {
    const matchLayoutIndex = getPotentialMatchIndex();
    if (!matchLayoutIndex.route) {
      if (routerOptions.onError) {
        routerOptions.onError(new Error("No layout match found", { cause: "no-layout-match" }));
        return;
      }
      return;
    }
    await renderRoute(matchLayoutIndex.route);
    return;
  }

  if(routerOptions.onNavigate){
    routerOptions.onNavigate(match.route);
  }

  await renderRoute(match.route);
  return;
}

window.addEventListener("popstate", getRoute);