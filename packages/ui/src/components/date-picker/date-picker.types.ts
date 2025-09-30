import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TDatePicker<T extends TBaseTagMap> = {
	label?: string;
	defaultDate?: Date;
	value?: Date;
	onSelect?: (date: Date) => void;
	withTime?: boolean;
	minDate?: Date;
	maxDate?: Date;
	color?:
		| "btn-primary"
		| "btn-secondary"
		| "btn-accent"
		| "btn-success"
		| "btn-warning"
		| "btn-info"
		| "btn-error";
	size?: "btn-xl" | "btn-lg" | "btn-md" | "btn-sm" | "btn-xs";
	disabled?: boolean;
	locale?: "pt-BR" | "en-US" | "es-ES";
	showToday?: boolean;
} & TBase<T>;