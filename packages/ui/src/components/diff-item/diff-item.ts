import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TDiffItem } from "./diff-item.types";

export function DiffItem<T extends TBaseTagMap = "div">(
	{ side, ...props }: TDiffItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(side === "left" ? "diff-left" : "diff-right", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
