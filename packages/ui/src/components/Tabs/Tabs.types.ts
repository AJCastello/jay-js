import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TTabs<T extends TBaseTagMap> = {
	variant?: "tabs-boxed" | "tabs-bordered" | "tabs-lifted";
} & TBase<T>;
