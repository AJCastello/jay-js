import { Button as ButtonElement, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TButton } from "./button.types";

export function Button<T extends TBaseTagMap = "button">(
	{ className, variant, color, size, wide, block, square, circle, disabled, ...props }: TButton<T> = {
		tag: "button",
	},
): HTMLElementTagNameMap[T] {
	return ButtonElement({
		...props,
		tag: "button",
		disabled,
		className: cn(
			"btn",
			variant,
			color,
			size,
			wide && "btn-wide",
			block && "btn-block",
			square && "btn-square",
			circle && "btn-circle",
			disabled && "btn-disabled",
			className,
		),
	}) as HTMLElementTagNameMap[T];
}
