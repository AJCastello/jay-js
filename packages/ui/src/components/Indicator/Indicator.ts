import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TIndicator } from "./Indicator.types.js";

export function Indicator<T extends TBaseTagMap = "div">(
	{ ...props }: TIndicator<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["indicator", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
