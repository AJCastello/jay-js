import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TDiffResizer } from "./diff-resizer.types";

export function DiffResizer<T extends TBaseTagMap = "div">(
	{ ...props }: TDiffResizer<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("diff-resizer", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
