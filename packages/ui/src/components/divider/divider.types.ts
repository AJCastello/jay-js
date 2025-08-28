import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TDivider<T extends TBaseTagMap> = {
	orientation?: "divider-vertical" | "divider-horizontal";
} & TBase<T>;
