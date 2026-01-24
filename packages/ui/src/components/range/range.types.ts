import type { TBase } from "@jay-js/system";

export type TRange = {
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
} & Omit<TBase<"input">, "tag">;

