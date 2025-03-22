import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TBottomNavigationItem<T extends TBaseTagMap> = {
	active?: boolean;
	disabled?: boolean;
} & TBase<T>;
