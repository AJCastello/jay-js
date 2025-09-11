import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TIndicator } from "./indicator.types";

export function Indicator<T extends TBaseTagMap = "div">(
	{ ...props }: TIndicator<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("indicator", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
