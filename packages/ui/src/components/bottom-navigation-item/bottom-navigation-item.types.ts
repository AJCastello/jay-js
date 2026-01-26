import type { TBase } from "@jay-js/system";

export type TBottomNavigationItem = {
	active?: boolean;
	disabled?: boolean;
} & Omit<TBase<"a">, "tag">;
