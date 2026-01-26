import type { TBase } from "@jay-js/system";

export type TTooltip = {
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
} & Omit<TBase<"div">, "tag">;
