import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TRange<T extends TBaseTagMap> = {
	size?: "range-xl" | "range-lg" | "range-md" | "range-sm" | "range-xs";
	color?:
		| "range-primary"
		| "range-secondary"
		| "range-accent"
		| "range-success"
		| "range-warning"
		| "range-info"
		| "range-error";
} & TBase<T>;
