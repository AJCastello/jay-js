import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TJoin } from "./join.types.js";

export function Join<T extends TBaseTagMap = "div">({ ...props }: TJoin<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
	const className = cn("join", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
