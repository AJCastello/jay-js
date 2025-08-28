import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TAlert } from "./alert.types";

export function Alert<T extends TBaseTagMap = "div">(
	{ severity = "alert-info", direction, variation, ...props }: TAlert<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("alert", severity, direction, variation, props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
