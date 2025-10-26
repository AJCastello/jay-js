import { Input, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TRadio } from "./radio.types";

export function Radio<T extends TBaseTagMap = "input">(
	{ className, color, size, ...props }: TRadio<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	return Input({
		...props,
		tag: "input",
		type: "radio",
		className: cn("radio", color, size, className),
	}) as HTMLElementTagNameMap[T];
}
