import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TDiffItem<T extends TBaseTagMap> = {
	side?: "left" | "right";
} & TBase<T>;
