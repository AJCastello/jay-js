import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TDropdownContent<T extends TBaseTagMap> = {
	orientation?: "divider-vertical" | "divider-horizontal";
} & TBase<T>;
