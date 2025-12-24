import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TSwap<T extends TBaseTagMap> = {
	effect?: "swap-rotate" | "swap-flip";
} & TBase<T>;
