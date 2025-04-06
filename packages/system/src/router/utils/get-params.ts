import { getPotentialMatch } from "../core/matching/get-potential-match";
import { createMatcher } from "./helpers";

/**
 * Retrieves all URL parameters from the current route
 *
 * This function extracts both route parameters (defined with :paramName in routes)
 * and query string parameters from the current URL.
 *
 * @returns {Record<string, string | string[]>} An object containing all URL parameters with parameter names as keys
 *
 * @example
 * // For a URL like '/users/123?filter=active'
 * // With a route defined as '/users/:id'
 * const params = getParams();
 * // Result: { id: '123', filter: 'active' }
 */
export function getParams(): Record<string, string | string[]> {
	const params: Record<string, string | string[]> = {};
	const match = getPotentialMatch();

	if (match.route && match.route.path) {
		const matcher = createMatcher(match.route.path);
		const matchResult = matcher(window.location.pathname);

		if (matchResult && matchResult.params) {
			// Process params to ensure they are all string or string[]
			Object.entries(matchResult.params).forEach(([key, value]) => {
				if (value !== undefined) {
					params[key] = value;
				}
			});
		}
	}

	// Also include query parameters
	const searchParams = new URLSearchParams(window.location.search);
	searchParams.forEach((value, key) => (params[key] = value));

	return params;
}
