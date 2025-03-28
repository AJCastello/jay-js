import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TDiffItem } from "./DiffItem.types.js";

export function DiffItem<T extends TBaseTagMap = "div">(
	{ side, ...props }: TDiffItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([side === "left" ? "diff-left" : "diff-right", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
