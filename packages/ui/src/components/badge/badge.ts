import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { IBadge } from "./badge.types";

export function Badge<T extends TBaseTagMap = "div">(
	{ variant, color, size, ...props }: IBadge<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("badge", variant, color, size, props.className);
	return Base({
		tag: "span",
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
