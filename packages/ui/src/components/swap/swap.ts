import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TSwap } from "./swap.types";

export function Swap<T extends TBaseTagMap = "label">(
	{ effect, ...props }: TSwap<T> = { tag: "label" },
): HTMLElementTagNameMap[T] {
	const className = cn("swap", effect, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
