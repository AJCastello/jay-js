import { type TBaseTagMap, TextArea as TextAreaElement } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TTextArea } from "./text-area.types";

export function TextArea<T extends TBaseTagMap = "textarea">(
	{ className, variant, color, size, fullWidth, ...props }: TTextArea<T> = { tag: "textarea" },
): HTMLElementTagNameMap[T] {
	return TextAreaElement({
		...props,
		tag: "textarea",
		className: cn("textarea", variant, color, size, fullWidth ? "w-full" : "", className),
	}) as HTMLElementTagNameMap[T];
}
