import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TDivider<T extends TBaseTagMap> = {
	orientation?: "divider-vertical" | "divider-horizontal";
} & TBase<T>;
