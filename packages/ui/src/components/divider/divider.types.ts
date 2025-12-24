import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TDivider<T extends TBaseTagMap> = {
	orientation?: "divider-vertical" | "divider-horizontal";
} & TBase<T>;
