import { IPotentialMatch } from "../types";
import { pathToRegex } from "../utils/pathToRegex";
import { resolvedRoutes } from "./routerDefineOptions";

export function getPotentialMatches(): Array<IPotentialMatch> {
  let pathName = location.pathname;

  if (pathName.substring(pathName.length - 1) === "/") {
    pathName = pathName.substring(0, pathName.length - 1)
  }

  const potentialMatches: Array<IPotentialMatch> = [];

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
