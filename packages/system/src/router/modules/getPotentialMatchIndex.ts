import { getPotentialMatches } from "./getPotentialMatches.js";
import { resolvedRoutes } from "./routerDefineOptions.js";

export function getPotentialMatchIndex() {
  const potentialMatches = getPotentialMatches();

  if (potentialMatches.length === 0) {
    const firstRoute = resolvedRoutes.values().next().value;
    return { route: firstRoute, result: [location.pathname] };
  }

  if (potentialMatches.length === 2) {
    return potentialMatches[1];
  }

  return potentialMatches[0];
}
