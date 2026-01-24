import type { TBase } from "@jay-js/system";

export type TStepItem = {
	color?:
		| "step-primary"
		| "step-secondary"
		| "step-accent"
		| "step-info"
		| "step-success"
		| "step-warning"
		| "step-error";
} & Omit<TBase<"li">, "tag">;
