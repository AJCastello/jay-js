import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TStepItem<T extends TBaseTagMap> = {
	color?:
		| "step-primary"
		| "step-secondary"
		| "step-accent"
		| "step-info"
		| "step-success"
		| "step-warning"
		| "step-error";
} & TBase<T>;
