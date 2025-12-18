import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TSwapItem<T extends TBaseTagMap> = {
	state?: "swap-on" | "swap-off";
} & TBase<T>;
