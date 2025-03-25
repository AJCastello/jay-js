import { getPotentialMatch } from "../core/matching/get-potential-match";

/**
 * Retrieves all URL parameters from the current route
 *
 * This function extracts both route parameters (defined with :paramName in routes)
 * and query string parameters from the current URL.
 *
 * @returns {Record<string, string>} An object containing all URL parameters with parameter names as keys
 *
 * @example
 * // For a URL like '/users/123?filter=active'
 * // With a route defined as '/users/:id'
 * const params = getParams();
 * // Result: { id: '123', filter: 'active' }
 */
export function getParams(): Record<string, string> {
	let params: Record<string, string> = {};
	const match = getPotentialMatch();

	if (match.result) {
		const values = match.result?.slice(1);
		const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);
		params = Object.fromEntries(keys.map((key, i) => [key, (values as any)[i]]));
	}

	const searchParams = new URLSearchParams(window.location.search);
	searchParams.forEach((value, key) => (params[key] = value));
	return params;
}
