import type { TBaseTagMap, TList } from "@jay-js/elements";

export type TMenu<T extends TBaseTagMap> = {
	size?: "menu-xs" | "menu-sm" | "menu-md" | "menu-lg" | "menu-xl";
	position?: "menu-vertical" | "menu-horizontal";
} & TList<T>;
