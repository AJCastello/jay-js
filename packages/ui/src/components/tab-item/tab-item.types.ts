import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TTabItem<T extends TBaseTagMap> = {
	size?: "tab-xs" | "tab-sm" | "tab-md" | "tab-lg";
	active?: boolean;
	disabled?: boolean;
} & TBase<T>;
