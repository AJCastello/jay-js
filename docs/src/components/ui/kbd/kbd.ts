import { Base, mergeClasses, type TBaseTagMap } from "@jay-js/elements";
import type { TKbd } from "./kbd.types";

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
