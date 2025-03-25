import { routerOptions } from "../configuration";
import { getPotentialMatch, getPotentialMatchIndex } from "../matching/get-potential-match";
import { renderRoute } from "../rendering/render-route";

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

	await renderRoute(match.route);
	return;
}

window.addEventListener("popstate", getRoute);
