import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TButton<T extends TBaseTagMap = "button"> = {
	variant?:
		| "btn-outline"
		| "btn-dash"
		| "btn-soft"
		| "btn-ghost"
		| "btn-link"
		| "btn-active";
	color?:
		| "btn-primary"
		| "btn-secondary"
		| "btn-accent"
		| "btn-neutral"
		| "btn-success"
		| "btn-warning"
		| "btn-info"
		| "btn-error";
	size?: "btn-xl" | "btn-lg" | "btn-md" | "btn-sm" | "btn-xs";
	wide?: boolean;
	block?: boolean;
	square?: boolean;
	circle?: boolean;
	disabled?: boolean;
} & TBase<T>;
