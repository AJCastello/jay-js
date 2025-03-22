import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TDiffItem<T extends TBaseTagMap> = {
	side?: "left" | "right";
} & TBase<T>;
