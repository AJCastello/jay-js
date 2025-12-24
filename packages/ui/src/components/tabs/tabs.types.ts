import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TTabs<T extends TBaseTagMap> = {
	variant?: "tabs-boxed" | "tabs-bordered" | "tabs-lifted";
} & TBase<T>;
