import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TDiffItem<T extends TBaseTagMap> = {
	side?: "left" | "right";
} & TBase<T>;
