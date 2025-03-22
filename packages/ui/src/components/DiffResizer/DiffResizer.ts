import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TDiffResizer } from "./DiffResizer.types.js";

export function DiffResizer<T extends TBaseTagMap = "div">(
	{ ...props }: TDiffResizer<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["diff-resizer", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
