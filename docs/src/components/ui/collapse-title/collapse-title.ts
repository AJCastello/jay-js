import { Base, type TBaseTagMap } from "@jay-js/elements";
import type { TCollapseTitle } from "./collapse-title.types";
import { cn } from "../../../utils/cn";

export function CollapseTitle<T extends TBaseTagMap = "div">(
	{ ...props }: TCollapseTitle<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("collapse-title", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
