import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TRating } from "./rating.types";

export function Rating<T extends TBaseTagMap = "div">(
	{ size, half, hidden, ...props }: TRating<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(
		"rating",
		size,
		half ? "rating-half" : "",
		hidden ? "rating-hidden" : "",
		props.className,
	);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
