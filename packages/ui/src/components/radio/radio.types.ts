import type { TBase } from "@jay-js/system";

export type TRadio = {
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
} & Omit<TBase<"input">, "tag">;
