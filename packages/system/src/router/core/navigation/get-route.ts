import { routerOptions } from "../configuration";
import { getPotentialMatch, getPotentialMatchIndex } from "../matching/get-potential-match";
import { renderRoute } from "../rendering/render-route";

export async function getRoute(pathName: string = window.location.pathname): Promise<void> {
	const match = getPotentialMatch(pathName);

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

	// Check route guard if present
	if (match.route.guard) {
		try {
			const guardResult = await match.route.guard(match.route);
			if (!guardResult) {
				// Guard rejected the navigation
				if (routerOptions.onError) {
					routerOptions.onError(new Error("Route access denied by guard", { cause: "guard-rejected" }));
				}
				return;
			}
		} catch (error) {
			// Guard threw an error
			if (routerOptions.onError) {
				routerOptions.onError(error instanceof Error ? error : new Error("Route guard error", { cause: error }));
			}
			return;
		}
	}

	if (match.route.layout) {
		const matchLayoutIndex = getPotentialMatchIndex(pathName);
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

window.addEventListener("popstate", () => getRoute());
