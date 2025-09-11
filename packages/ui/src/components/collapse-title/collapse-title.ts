import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TCollapseTitle } from "./collapse-title.types";

export function CollapseTitle<T extends TBaseTagMap = "div">(
	{ ...props }: TCollapseTitle<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("collapse-title", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
