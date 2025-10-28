import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TDateRangePicker<T extends TBaseTagMap> = {
	startLabel?: string;
	endLabel?: string;
	startValue?: Date;
	endValue?: Date;
	onSelectRange?: (startDate: Date, endDate: Date) => void;
	onStartChange?: (date: Date) => void;
	onEndChange?: (date: Date) => void;
	withTime?: boolean;
	minDate?: Date;
	maxDate?: Date;
	color?: "btn-primary" | "btn-secondary" | "btn-accent" | "btn-success" | "btn-warning" | "btn-info" | "btn-error";
	size?: "btn-xl" | "btn-lg" | "btn-md" | "btn-sm" | "btn-xs";
	disabled?: boolean;
	locale?: "pt-BR" | "en-US" | "es-ES";
	showToday?: boolean;
	layout?: "horizontal" | "vertical";
	gap?: "gap-1" | "gap-2" | "gap-3" | "gap-4" | "gap-5" | "gap-6";
	validateRange?: boolean;
} & TBase<T>;
