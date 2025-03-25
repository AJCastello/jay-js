import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TDivider } from "./Divider.types.js";

export function Divider<T extends TBaseTagMap = "div">(
	{ orientation, ...props }: TDivider<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["divider", orientation, props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
