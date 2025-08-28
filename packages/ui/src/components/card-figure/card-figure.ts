import { TBaseTagMap, Base } from "@jay-js/elements";
import { TCardFigure } from "./card-figure.types";

export function CardFigure<T extends TBaseTagMap = "figure">(
	{ ...props }: TCardFigure<T> = { tag: "figure" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "figure",
	}) as HTMLElementTagNameMap[T];
}
