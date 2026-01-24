import { Base, type TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TSwapItem } from "./swap-item.types";

export function SwapItem<T extends TBaseTagMap = "div">(
	{ state, ...props }: TSwapItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn(state, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
