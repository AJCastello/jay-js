import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TTooltip<T extends TBaseTagMap> = {
	tip?: string;
	color?:
		| "tooltip-primary"
		| "tooltip-secondary"
		| "tooltip-accent"
		| "tooltip-info"
		| "tooltip-success"
		| "tooltip-warning"
		| "tooltip-error";
	position?: "tooltip-top" | "tooltip-bottom" | "tooltip-left" | "tooltip-right";
	forceOpen?: boolean;
} & TBase<T>;
