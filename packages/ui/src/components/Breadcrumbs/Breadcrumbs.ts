import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TBreadcrumbs } from "./Breadcrumbs.types.js";

export function Breadcrumbs<T extends TBaseTagMap = "div">(
	{ ...props }: TBreadcrumbs<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["breadcrumbs", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
