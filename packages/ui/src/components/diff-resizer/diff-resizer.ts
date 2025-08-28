import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TDiffResizer } from "./diff-resizer.types";

export function DiffResizer<T extends TBaseTagMap = "div">(
	{ ...props }: TDiffResizer<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("diff-resizer", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
