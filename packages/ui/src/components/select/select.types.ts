import type { TBase } from "@jay-js/system";

export type TSelect = {
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
} & Omit<TBase<"select">, "tag">;

