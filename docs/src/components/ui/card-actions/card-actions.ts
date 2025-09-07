import { Base, mergeClasses, type TBaseTagMap } from "@jay-js/elements";
import type { TCardActions } from "./card-actions.types";

export function CardActions<T extends TBaseTagMap = "div">(
	{ ...props }: TCardActions<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("card-actions", props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
