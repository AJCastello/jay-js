import { Input } from "@jay-js/elements";
import { TBaseTagMap } from "@jay-js/system/dist";
import { cn } from "../../utils/cn";
import type { TRange } from "./range.types";

export function Range<T extends TBaseTagMap = "input">(
	{ className, color, size, ...props }: TRange<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	return Input({
		...props,
		tag: "input",
		type: "range",
		className: cn("range", color, size, className),
	}) as HTMLElementTagNameMap[T];
}
