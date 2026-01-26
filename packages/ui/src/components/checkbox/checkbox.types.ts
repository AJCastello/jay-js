import type { TBase } from "@jay-js/system";

export type TCheckbox = {
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
} & Omit<TBase<"input">, "tag">;
