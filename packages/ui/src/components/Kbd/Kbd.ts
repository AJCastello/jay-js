import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TKbd } from "./Kbd.types.js";

export function Kbd<T extends TBaseTagMap = "kbd">(
	{ size, ...props }: TKbd<T> = { tag: "kbd" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["kbd", size, props.className]);

	return Base({
		tag: "kbd",
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
