import { TBaseTagMap, mergeClasses, Box } from "@jay-js/elements";
import { TSwapItem } from "./swap-item.types";

export function SwapItem<T extends TBaseTagMap = "div">(
	{ state, ...props }: TSwapItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(state, props.className);

	return Box({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
