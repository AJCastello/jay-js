import type { TBase } from "@jay-js/system";

export type TProgress = {
	color?:
		| "progress-primary"
		| "progress-secondary"
		| "progress-accent"
		| "progress-neutral"
		| "progress-success"
		| "progress-warning"
		| "progress-info"
		| "progress-error";
} & Omit<TBase<"progress">, "tag">;
