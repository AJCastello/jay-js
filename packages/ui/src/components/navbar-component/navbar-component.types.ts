import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TNavbarComponent<T extends TBaseTagMap> = {
	component?: "navbar-start" | "navbar-center" | "navbar-end";
} & TBase<T>;
