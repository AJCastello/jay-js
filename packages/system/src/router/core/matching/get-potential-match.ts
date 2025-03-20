import { TPotentialMatch, TRouteInstance } from "../../types";
import { pathToRegex } from "../../utils/helpers";
import { resolvedRoutes } from "../configuration";

export function getPotentialMatch(): TPotentialMatch {
  const potentialMatches = getPotentialMatches();

  const firstRoute = resolvedRoutes.values().next().value as TRouteInstance;

  const resultMatch = potentialMatches.reduce<TPotentialMatch>(
    (acc, curr) => {
      if (curr.result !== null) {
        if (acc.result === null) {
          return curr;
        }
        // TODO (Fix Routing System <-)
        /* if (curr.result.length > acc.result.length) {
          return curr;
        } */
      }
      return acc;
    },
    {
      route: firstRoute,
      result: null,
    }
  );

  if (resultMatch) {
    return resultMatch;
  }

  return { route: firstRoute, result: [location.pathname] };
}


export function getPotentialMatches(): Array<TPotentialMatch> {
  let pathName = location.pathname;

  if (pathName.substring(pathName.length - 1) === "/") {
    pathName = pathName.substring(0, pathName.length - 1);
  }

  const potentialMatches: Array<TPotentialMatch> = [];

  for (const route of resolvedRoutes.values()) {
    const result = pathName.match(pathToRegex(route.path));
    if (result) {
      potentialMatches.push({
        route: route,
        result: result,
      });
    }
  }

  return potentialMatches;
}


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
