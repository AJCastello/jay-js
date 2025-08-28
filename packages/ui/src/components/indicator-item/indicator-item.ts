import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TIndicatorItem } from "./indicator-item.types";

export function IndicatorItem<T extends TBaseTagMap = "span">(
	{ horizontal, vertical, ...props }: TIndicatorItem<T> = { tag: "span" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("indicator-item", horizontal, vertical, props.className);

	return Base({
		...props,
		tag: "span",
		className,
	}) as HTMLElementTagNameMap[T];
}
