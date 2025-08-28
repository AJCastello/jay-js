import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TCollapse } from "./collapse.types";

export function Collapse<T extends TBaseTagMap = "div">(
	{ variant, forceOpen, forceClose, ...props }: TCollapse<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(
		"collapse",
		variant,
		forceOpen ? "collapse-open" : "",
		forceClose ? "collapse-close" : "",
		props.className,
	);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
