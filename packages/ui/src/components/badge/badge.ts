import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { IBadge } from "./badge.types";

export function Badge<T extends TBaseTagMap = "div">(
	{ variant, color, size, ...props }: IBadge<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("badge", variant, color, size, props.className);
	return Base({
		tag: "span",
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
