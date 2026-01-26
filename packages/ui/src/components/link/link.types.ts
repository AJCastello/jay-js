import type { TBase } from "@jay-js/system";

export type TLink = {
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
} & Omit<TBase<"a">, "tag">;
