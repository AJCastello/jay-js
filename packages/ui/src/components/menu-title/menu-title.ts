import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TMenuTitle } from "./menu-title.types";

export function MenuTitle<T extends TBaseTagMap = "li">(
	{ tag = "li", ...props }: TMenuTitle<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("menu-title", props.className);

	return Base({
		tag,
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
