import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TStack } from "./stack.types";

export function Stack<T extends TBaseTagMap = "div">(
	{ ...props }: TStack<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("stack", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
