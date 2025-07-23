import type { TBase, TBaseTagMap } from "../Base/index.js";

export type TTextArea<T extends TBaseTagMap> = {
	placeholder?: string;
	fullWidth?: boolean;
	variant?: "textarea-ghost";
	color?:
	| "textarea-primary"
	| "textarea-secondary"
	| "textarea-accent"
	| "textarea-success"
	| "textarea-warning"
	| "textarea-info"
	| "textarea-error";
	size?: "textarea-xl" | "textarea-lg" | "textarea-md" | "textarea-sm" | "textarea-xs";
} & TBase<T>;
