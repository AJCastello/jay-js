import { mergeClasses } from "../../utils/mergeClasses.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import { Box } from "../Box/index.js";
import type { TSwapItem } from "./SwapItem.types.js";

export function SwapItem<T extends TBaseTagMap = "div">(
	{ state, ...props }: TSwapItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([state, props.className]);

	return Box({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
