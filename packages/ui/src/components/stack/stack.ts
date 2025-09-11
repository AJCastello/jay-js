import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TStack } from "./stack.types";

export function Stack<T extends TBaseTagMap = "div">(
	{ ...props }: TStack<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("stack", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
