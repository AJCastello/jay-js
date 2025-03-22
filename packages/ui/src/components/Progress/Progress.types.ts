import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TProgress<T extends TBaseTagMap> = {
	color?:
		| "progress-primary"
		| "progress-secondary"
		| "progress-accent"
		| "progress-info"
		| "progress-success"
		| "progress-warning"
		| "progress-error";
} & TBase<T>;
