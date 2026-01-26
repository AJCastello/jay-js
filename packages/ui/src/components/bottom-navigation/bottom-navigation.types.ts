import type { TBase } from "@jay-js/system";

export type IBottomNavigation = {
	size?: "btm-nav-xs" | "btm-nav-sm" | "btm-nav-md" | "btm-nav-lg";
} & Omit<TBase<"div">, "tag">;
