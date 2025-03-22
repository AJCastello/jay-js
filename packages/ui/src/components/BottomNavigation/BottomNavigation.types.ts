import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type IBottomNavigation<T extends TBaseTagMap> = {
	size?: "btm-nav-xs" | "btm-nav-sm" | "btm-nav-md" | "btm-nav-lg";
} & TBase<T>;
