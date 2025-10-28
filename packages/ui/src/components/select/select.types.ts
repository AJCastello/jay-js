import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TSelect<T extends TBaseTagMap = "select"> = {
	variant?: "select-ghost";
	color?:
		| "select-primary"
		| "select-secondary"
		| "select-accent"
		| "select-neutral"
		| "select-success"
		| "select-warning"
		| "select-info"
		| "select-error";
	size?: "select-xl" | "select-lg" | "select-md" | "select-sm" | "select-xs";
	fullWidth?: boolean;
} & TBase<T>;
