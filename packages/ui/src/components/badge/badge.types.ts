import type { TBase } from "@jay-js/system";

export type IBadge = {
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
} & Omit<TBase<"span">, "tag">;
