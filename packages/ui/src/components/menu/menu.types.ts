import type { TList } from "@jay-js/elements";
import type { TBaseTagMap } from "@jay-js/system";

export type TMenu<T extends TBaseTagMap> = {
	size?: "menu-xs" | "menu-sm" | "menu-md" | "menu-lg" | "menu-xl";
	position?: "menu-vertical" | "menu-horizontal";
} & TList<T>;
