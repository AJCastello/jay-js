import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TSwap } from "./swap.types";

export function Swap<T extends TBaseTagMap = "label">(
	{ effect, ...props }: TSwap<T> = { tag: "label" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("swap", effect, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
