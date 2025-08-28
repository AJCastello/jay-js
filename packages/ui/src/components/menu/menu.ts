import { TBaseTagMap, mergeClasses, List } from "@jay-js/elements";
import { TMenu } from "./menu.types";

export function Menu<T extends TBaseTagMap = "ul">(
	{ size, position, ...props }: TMenu<T> = { tag: "ul" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("menu", size, position, props.className);

	return List({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
