import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TRating<T extends TBaseTagMap> = {
	size?: "rating-lg" | "rating-md" | "rating-sm" | "rating-xs";
	half?: boolean;
	hidden?: boolean;
} & TBase<T>;
