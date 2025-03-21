import { selector } from "../../utils/dom/query";
import type { TRouteInstance, TRouterOptions } from "../types";

export const routerOptions: TRouterOptions = {
	prefix: "",
	target: document.body,
	onError: console.error,
	onNavigate: () => {},
	beforeResolve: () => true,
};

export const resolvedRoutes = new Map<string, TRouteInstance>();

export function routerDefineOptions(options: Partial<TRouterOptions>) {
	if (typeof options.target === "string") {
		const targetElement = selector(options.target);
		if (!targetElement) {
			if (options.onError) {
				options.onError(new Error(`Target element not found: ${options.target}`, { cause: "invalid-target" }));
			}
			return;
		}
		options.target = targetElement;
	}
	Object.assign(routerOptions, options);
}
