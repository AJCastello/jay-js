import type { TBase } from "@jay-js/system";

export type TToggle = {
	label?: string;
	color?:
		| "toggle-primary"
		| "toggle-secondary"
		| "toggle-accent"
		| "toggle-neutral"
		| "toggle-success"
		| "toggle-warning"
		| "toggle-info"
		| "toggle-error";
	size?: "toggle-xl" | "toggle-lg" | "toggle-md" | "toggle-sm" | "toggle-xs";
	position?: "toggle-before" | "toggle-after";
	formControl?: Omit<TBase<"div">, "tag">;
} & Omit<TBase<"input">, "tag">;

