import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../../utils/cn";
import type { TCollapse } from "./collapse.types";

export function Collapse<T extends TBaseTagMap = "div">(
	{ variant, forceOpen, forceClose, ...props }: TCollapse<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn(
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
