import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TBreadcrumbs } from "./breadcrumbs.types";

export function Breadcrumbs<T extends TBaseTagMap = "div">(
	{ ...props }: TBreadcrumbs<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("breadcrumbs", props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
