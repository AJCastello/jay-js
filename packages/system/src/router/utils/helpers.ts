import { routerDefineOptions } from "../core/configuration";

export function onNavigate(callback: () => void) {
	routerDefineOptions({ onNavigate: callback });
}

export function pathToRegex(path: string) {
	return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "([^/]+)") + "$");
}
