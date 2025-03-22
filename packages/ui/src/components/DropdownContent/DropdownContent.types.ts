import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TDropdownContent<T extends TBaseTagMap> = {
	orientation?: "divider-vertical" | "divider-horizontal";
} & TBase<T>;
