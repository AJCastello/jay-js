import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TRating } from "./rating.types";

export function Rating<T extends TBaseTagMap = "div">(
	{ size, half, hidden, ...props }: TRating<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("rating", size, half ? "rating-half" : "", hidden ? "rating-hidden" : "", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
