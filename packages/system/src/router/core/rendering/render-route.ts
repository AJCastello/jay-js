import type { TRouteInstance } from "../../types";
import { resolvedRoutes, routerOptions } from "../configuration";

// Import LazyModule functionality
import { LazyModule } from "../../../lazy/core/lazy-module.js";

export async function renderRoute(route: TRouteInstance): Promise<HTMLElement | undefined> {
	const target = await getTarget(route);
	if (!target || !(target instanceof HTMLElement)) return;

	// Handle both element and import/module properties
	if (route.element || route.import) {
		const element = await getElement(route);
		if (!element) return;

		target.innerHTML = "";
		target.append(element as HTMLElement);
		return target;
	}

	return;
}

export async function getElement(route: TRouteInstance) {
	try {
		// Handle lazy loading via import and module properties
		if (route.import) {
			const lazyElement = LazyModule({
				import: route.import,
				module: route.module,
				props: route.params,
			});

			if (route.layout) {
				lazyElement.dataset.layoutId = route.id;
			}

			return lazyElement;
		}

		// Handle traditional element property
		if (route.element) {
			if (typeof route.element === "function" && route.element instanceof Promise) {
				const element = (await route.element()) as HTMLElement;
				if (route.layout) {
					element.dataset.layoutId = route.id;
				}
				return element;
			}

			if (typeof route.element === "function") {
				const element = route.element() as HTMLElement;
				if (route.layout) {
					element.dataset.layoutId = route.id;
				}
				return element;
			}

			const element = route.element as HTMLElement;
			if (route.layout) {
				element.dataset.layoutId = route.id;
			}
			return element;
		}
	} catch (error) {
		if (routerOptions.onError) {
			console.error(error);
			routerOptions.onError(new Error("Error rendering route", { cause: "render-route" }));
			return;
		}
		throw error;
	}
}

export async function getTarget(route: TRouteInstance) {
	if (route.parentLayoutId) {
		const parentLayout = document.querySelector(`[data-layout-id="${route.parentLayoutId}"]`);

		if (parentLayout) {
			const outlet = parentLayout.querySelector('[data-router="outlet"]');
			if (outlet) {
				return outlet;
			}
		}

		if (!parentLayout) {
			const parentLayoutRoute = resolvedRoutes.get(route.parentLayoutId);
			if (parentLayoutRoute) {
				const parentLayoutRouteRendered = await renderRoute(parentLayoutRoute);
				if (parentLayoutRouteRendered) {
					const outlet = parentLayoutRouteRendered.querySelector('[data-router="outlet"]');
					if (outlet) {
						return outlet;
					}
				}
			}
		}
	}

	return route.target;
}
