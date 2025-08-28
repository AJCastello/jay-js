import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TCollapseContent } from "./collapse-content.types";

export function CollapseContent<T extends TBaseTagMap = "div">(
	{ ...props }: TCollapseContent<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("collapse-content", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
