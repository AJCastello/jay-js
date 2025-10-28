import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TLink<T extends TBaseTagMap = "a"> = {
	variant?: "link-hover";
	color?:
		| "link-primary"
		| "link-secondary"
		| "link-accent"
		| "link-neutral"
		| "link-success"
		| "link-warning"
		| "link-info"
		| "link-error";
} & TBase<T>;
