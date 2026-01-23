import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TKbd<T extends TBaseTagMap> = {
	size?: "kbd-xl" | "kbd-lg" | "kbd-md" | "kbd-sm" | "kbd-xs";
} & TBase<T>;
