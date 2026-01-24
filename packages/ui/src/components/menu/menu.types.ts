import type { TBase } from "@jay-js/system";

export type TMenu = {
	size?: "menu-xs" | "menu-sm" | "menu-md" | "menu-lg" | "menu-xl";
	position?: "menu-vertical" | "menu-horizontal";
} & Omit<TBase<"ul">, "tag">;
