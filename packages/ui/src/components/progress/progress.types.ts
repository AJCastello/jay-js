import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TProgress<T extends TBaseTagMap = "progress"> = {
	color?:
		| "progress-primary"
		| "progress-secondary"
		| "progress-accent"
		| "progress-neutral"
		| "progress-success"
		| "progress-warning"
		| "progress-info"
		| "progress-error";
} & TBase<T>;
