import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TBottomNavigationItem<T extends TBaseTagMap> = {
	active?: boolean;
	disabled?: boolean;
} & TBase<T>;
