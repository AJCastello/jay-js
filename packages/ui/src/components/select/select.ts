import { Select as SelectElement, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TSelect } from "./select.types";

export function Select<T extends TBaseTagMap = "select">(
	{ className, variant, color, size, fullWidth, ...props }: TSelect<T> = { tag: "select" },
): HTMLElementTagNameMap[T] {
	return SelectElement({
		...props,
		tag: "select",
		className: cn("select", variant, color, size, fullWidth ? "w-full" : "", className),
	}) as HTMLElementTagNameMap[T];
}
