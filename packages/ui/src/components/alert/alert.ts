import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TAlert } from "./alert.types";

export function Alert<T extends TBaseTagMap = "div">(
	{ severity = "alert-info", direction, variation, ...props }: TAlert<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("alert", severity, direction, variation, props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
