import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TKbd } from "./kbd.types";

export function Kbd<T extends TBaseTagMap = "kbd">(
	{ size, ...props }: TKbd<T> = { tag: "kbd" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("kbd", size, props.className);

	return Base({
		tag: "kbd",
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
