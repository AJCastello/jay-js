import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TTextArea<T extends TBaseTagMap = "textarea"> = {
	variant?: "textarea-ghost";
	color?:
		| "textarea-primary"
		| "textarea-secondary"
		| "textarea-accent"
		| "textarea-neutral"
		| "textarea-success"
		| "textarea-warning"
		| "textarea-info"
		| "textarea-error";
	size?: "textarea-xl" | "textarea-lg" | "textarea-md" | "textarea-sm" | "textarea-xs";
	fullWidth?: boolean;
} & TBase<T>;
