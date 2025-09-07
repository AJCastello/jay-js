import { Base, type TBaseTagMap } from "@jay-js/elements";
import type { TCollapseContent } from "./collapse-content.types";
import { cn } from "../../../utils/cn";

export function CollapseContent<T extends TBaseTagMap = "div">(
	{ ...props }: TCollapseContent<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("collapse-content", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
