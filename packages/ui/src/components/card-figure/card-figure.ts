import { Base, type TBaseTagMap } from "@jay-js/elements";
import type { TCardFigure } from "./card-figure.types";

export function CardFigure<T extends TBaseTagMap = "figure">(
	{ ...props }: TCardFigure<T> = { tag: "figure" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "figure",
	}) as HTMLElementTagNameMap[T];
}
