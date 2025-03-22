import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TStack } from "./Stack.types.js";

export function Stack<T extends TBaseTagMap = "div">(
	{ ...props }: TStack<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["stack", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
