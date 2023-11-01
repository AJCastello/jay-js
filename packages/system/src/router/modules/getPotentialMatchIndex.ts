import { getPotentialMatches } from "./getPotentialMatches";
import { resolvedRoutes } from "./routerDefineOptions";

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
