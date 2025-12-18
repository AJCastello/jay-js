import { TList } from "@jay-js/elements";
import { TBaseTagMap } from "@jay-js/system/dist";

export type TMenu<T extends TBaseTagMap> = {
	size?: "menu-xs" | "menu-sm" | "menu-md" | "menu-lg" | "menu-xl";
	position?: "menu-vertical" | "menu-horizontal";
} & TList<T>;
