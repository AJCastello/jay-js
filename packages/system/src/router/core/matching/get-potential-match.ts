import type { TPotentialMatch, TRouteInstance } from "../../types";
import { createMatcher, pathToRegex } from "../../utils/helpers";
import { resolvedRoutes } from "../configuration";

export function getPotentialMatch(): TPotentialMatch {
	const potentialMatches = getPotentialMatches();

	const firstRoute = resolvedRoutes.values().next().value as TRouteInstance;

	if (potentialMatches.length === 0) {
		return { route: firstRoute, result: null };
	}

	// Sort matches by specificity (more segments is more specific)
	// This is a better approach than just comparing result length
	potentialMatches.sort((a, b) => {
		// Count number of path segments
		const aSegments = a.route.path.split("/").filter(Boolean).length;
		const bSegments = b.route.path.split("/").filter(Boolean).length;

		// More segments = higher priority
		if (aSegments !== bSegments) {
			return bSegments - aSegments;
		}

		// If same number of segments, check for parameters (static routes are more specific)
		const aParams = a.route.path.match(/:[^/]+/g) || [];
		const bParams = b.route.path.match(/:[^/]+/g) || [];

		// Fewer parameters = higher priority (more static segments)
		return aParams.length - bParams.length;
	});

	return potentialMatches[0];
}

export function getPotentialMatches(): Array<TPotentialMatch> {
	let pathName = location.pathname;

	// Normalize path (remove trailing slash except for root)
	if (pathName !== "/" && pathName.substring(pathName.length - 1) === "/") {
		pathName = pathName.substring(0, pathName.length - 1);
	}

	const potentialMatches: Array<TPotentialMatch> = [];

	for (const route of resolvedRoutes.values()) {
		// Use path-to-regexp matcher for better matching
		const matcher = createMatcher(route.path);
		const matchResult = matcher(pathName);

		if (matchResult) {
			// Extract param values and ensure they are strings
			const paramValues = Object.values(matchResult.params || {})
				.map((value) => (typeof value === "string" ? value : Array.isArray(value) ? value.join("/") : String(value)))
				.filter(Boolean);

			potentialMatches.push({
				route: route,
				result: [pathName, ...paramValues],
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

	// Return the most specific match (first after sorting)
	return potentialMatches[0];
}
