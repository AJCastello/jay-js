import { TBase, type TBaseTagMap } from "../Base/Base.types.js";
import type { TList } from "../List/List.types.js";

export type TMenu<T extends TBaseTagMap> = {
	size?: "menu-xs" | "menu-sm" | "menu-md" | "menu-lg" | "menu-xl";
	position?: "menu-vertical" | "menu-horizontal";
} & TList<T>;
