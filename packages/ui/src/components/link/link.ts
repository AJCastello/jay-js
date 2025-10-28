import { Link as LinkElement, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TLink } from "./link.types";

export function Link<T extends TBaseTagMap = "a">(
	{ className, variant, color, ...props }: TLink<T> = { tag: "a" },
): HTMLElementTagNameMap[T] {
	return LinkElement({
		...props,
		tag: "a",
		className: cn("link", variant, color, className),
	}) as HTMLElementTagNameMap[T];
}
