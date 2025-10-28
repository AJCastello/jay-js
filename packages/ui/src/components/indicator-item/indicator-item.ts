import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TIndicatorItem } from "./indicator-item.types";

export function IndicatorItem<T extends TBaseTagMap = "span">(
	{ horizontal, vertical, ...props }: TIndicatorItem<T> = { tag: "span" },
): HTMLElementTagNameMap[T] {
	const className = cn("indicator-item", horizontal, vertical, props.className);

	return Base({
		...props,
		tag: "span",
		className,
	}) as HTMLElementTagNameMap[T];
}
