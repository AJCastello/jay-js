import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TCheckbox<T extends TBaseTagMap = "input"> = {
	color?:
		| "checkbox-primary"
		| "checkbox-secondary"
		| "checkbox-accent"
		| "checkbox-neutral"
		| "checkbox-success"
		| "checkbox-warning"
		| "checkbox-info"
		| "checkbox-error";
	size?: "checkbox-xl" | "checkbox-lg" | "checkbox-md" | "checkbox-sm" | "checkbox-xs";
	indeterminate?: boolean;
} & TBase<T>;
