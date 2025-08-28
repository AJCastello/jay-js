import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TIndicator } from "./indicator.types";

export function Indicator<T extends TBaseTagMap = "div">(
	{ ...props }: TIndicator<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("indicator", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
