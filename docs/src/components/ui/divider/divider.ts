import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../../utils/cn.js";
import type { TDivider } from "./divider.types.js";

export function Divider<T extends TBaseTagMap = "div">(
	{ orientation, ...props }: TDivider<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("divider", orientation, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
