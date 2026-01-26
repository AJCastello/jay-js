import type { TBase } from "@jay-js/system";

export type TTabItem = {
	size?: "tab-xs" | "tab-sm" | "tab-md" | "tab-lg";
	active?: boolean;
	disabled?: boolean;
} & Omit<TBase<"a">, "tag">;
