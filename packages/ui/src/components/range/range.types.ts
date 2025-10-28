import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TRange<T extends TBaseTagMap = "input"> = {
	color?:
		| "range-primary"
		| "range-secondary"
		| "range-accent"
		| "range-neutral"
		| "range-success"
		| "range-warning"
		| "range-info"
		| "range-error";
	size?: "range-xl" | "range-lg" | "range-md" | "range-sm" | "range-xs";
} & TBase<T>;
