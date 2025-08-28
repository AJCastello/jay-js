import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type IBadge<T extends TBaseTagMap> = {
	variant?: "badge-outline" | "badge-dash" | "badge-soft";
	color?:
		| "badge-primary"
		| "badge-secondary"
		| "badge-accent"
		| "badge-ghost"
		| "badge-info"
		| "badge-success"
		| "badge-warning"
		| "badge-error";
	size?: "badge-xl" | "badge-lg" | "badge-md" | "badge-sm" | "badge-xs";
} & TBase<T>;
