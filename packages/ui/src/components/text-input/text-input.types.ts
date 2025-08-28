import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TTextInput<T extends TBaseTagMap> = {
	placeholder?: string;
	fullWidth?: boolean;
	variant?: "input-ghost";
	containerClassName?: string;
	color?:
	| "input-primary"
	| "input-secondary"
	| "input-accent"
	| "input-success"
	| "input-warning"
	| "input-info"
	| "input-error";
	inputSize?: "input-xl" | "input-lg" | "input-md" | "input-sm" | "input-xs";
	startAdornment?: HTMLElement | string | ((inputElement: HTMLInputElement) => HTMLElement | string);
	endAdornment?: HTMLElement | string | ((inputElement: HTMLInputElement) => HTMLElement | string);
} & TBase<T>;