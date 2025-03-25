import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TCardFigure } from "./CardFigure.types.js";

export function CardFigure<T extends TBaseTagMap = "figure">(
	{ ...props }: TCardFigure<T> = { tag: "figure" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["card-figure", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
