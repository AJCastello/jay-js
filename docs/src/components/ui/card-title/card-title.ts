import { Base, mergeClasses, type TBaseTagMap } from "@jay-js/elements";
import type { TCardTitle } from "./card-title.types";

export function CardTitle<T extends TBaseTagMap = "h1">(
	{ ...props }: TCardTitle<T> = { tag: "h1" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("card-title", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
