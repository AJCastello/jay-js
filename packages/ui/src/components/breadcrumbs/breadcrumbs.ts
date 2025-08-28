import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TBreadcrumbs } from "./breadcrumbs.types";

export function Breadcrumbs<T extends TBaseTagMap = "div">(
	{ ...props }: TBreadcrumbs<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("breadcrumbs", props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
