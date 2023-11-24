import { getPotentialMatch } from "./getPotentialMatch.js";
import { getPotentialMatchIndex } from "./getPotentialMatchIndex.js";
import { renderRoute } from "./renderRoute.js";
import { routerOptions } from "./routerDefineOptions.js";

export async function getRoute() {
  const match = getPotentialMatch();

  if (routerOptions.beforeResolve) {
    const beforeResolve = routerOptions.beforeResolve(match.route);
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
  };

  if (match.route.layout) {
    const matchLayoutIndex = getPotentialMatchIndex();
    await renderRoute(matchLayoutIndex.route);
    return;
  }

  await renderRoute(match.route);
  return;
}

window.addEventListener("popstate", getRoute);