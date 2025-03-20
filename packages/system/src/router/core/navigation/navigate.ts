import { routerOptions } from "../configuration";
import { getRoute } from "./get-route";

export function Navigate(path: string) {
	const prefixOptions = routerOptions.prefix || "";

	if (prefixOptions) {
		path = [prefixOptions, path]
			.join("/")
			.replace(/\/+$/, "")
			.replace(/\/{2,}/g, "/");
	}

	history.pushState(null, "", path);
	getRoute();
}
