import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import type { TJoin } from "./join.types.js";

export function Join<T extends TBaseTagMap = "div">({ ...props }: TJoin<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
	const className = mergeClasses("join", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
