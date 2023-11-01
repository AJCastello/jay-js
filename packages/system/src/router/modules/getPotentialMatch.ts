import { IPotentialMatch, IRouteInstance } from "../types";
import { getPotentialMatches } from "./getPotentialMatches";
import { resolvedRoutes } from "./routerDefineOptions";

export function getPotentialMatch(): IPotentialMatch {
  const potentialMatches = getPotentialMatches();

  const firstRoute = resolvedRoutes.values().next().value as IRouteInstance;

  const resultMatch = potentialMatches.reduce<IPotentialMatch>((acc, curr) => {
    if (curr.result !== null) {
      if (acc.result === null) {
        return curr;
      }
      if (curr.result.length > acc.result.length) {
        return curr;
      }
    }
    return acc;
  }, {
    route: firstRoute,
    result: null
  });

  if (resultMatch) {
    return resultMatch;
  }

  return { route: firstRoute, result: [location.pathname] };
}
