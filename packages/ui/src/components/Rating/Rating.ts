import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TRating } from "./Rating.types.js";

export function Rating<T extends TBaseTagMap = "div">(
	{ size, half, hidden, ...props }: TRating<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([
		"rating",
		size,
		half ? "rating-half" : "",
		hidden ? "rating-hidden" : "",
		props.className,
	]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
