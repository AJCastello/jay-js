import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TRadio<T extends TBaseTagMap = "input"> = {
	color?:
		| "radio-primary"
		| "radio-secondary"
		| "radio-accent"
		| "radio-neutral"
		| "radio-success"
		| "radio-warning"
		| "radio-info"
		| "radio-error";
	size?: "radio-xl" | "radio-lg" | "radio-md" | "radio-sm" | "radio-xs";
} & TBase<T>;
