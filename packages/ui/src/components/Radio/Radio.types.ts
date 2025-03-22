import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TRadioColor =
	| "radio-neutral"
	| "radio-primary"
	| "radio-secondary"
	| "radio-accent"
	| "radio-success"
	| "radio-warning"
	| "radio-info"
	| "radio-error";

export type TRadioSize = "radio-xs" | "radio-sm" | "radio-md" | "radio-lg" | "radio-xl";

export type TRadioPosition = "radio-before" | "radio-after";

export type TRadio<T extends TBaseTagMap = "input"> = TBase<T> & {
	label?: string;
	color?: TRadioColor;
	size?: TRadioSize;
	position?: TRadioPosition;
	formControl?: Omit<TBase<"div">, "children">;
};
