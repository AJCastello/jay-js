import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TDiffItem } from "./diff-item.types";

export function DiffItem<T extends TBaseTagMap = "div">(
	{ side, ...props }: TDiffItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn(side === "left" ? "diff-left" : "diff-right", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
