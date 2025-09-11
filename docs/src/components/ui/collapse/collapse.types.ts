import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TCollapse<T extends TBaseTagMap> = {
	variant?: "collapse-arrow" | "collapse-plus";
	forceOpen?: boolean;
	forceClose?: boolean;
} & TBase<T>;
