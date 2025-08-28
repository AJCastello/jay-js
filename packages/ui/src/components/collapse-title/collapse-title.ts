import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TCollapseTitle } from "./collapse-title.types";

export function CollapseTitle<T extends TBaseTagMap = "div">(
	{ ...props }: TCollapseTitle<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("collapse-title", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
