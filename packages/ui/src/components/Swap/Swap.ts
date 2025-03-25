import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TSwap } from "./Swap.types.js";

export function Swap<T extends TBaseTagMap = "label">(
	{ effect, ...props }: TSwap<T> = { tag: "label" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["swap", effect, props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
