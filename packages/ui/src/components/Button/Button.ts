import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import { RippleEffect } from "../RippleEffect/index.js";
import type { TButton } from "./Button.types.js";

export function Button<T extends TBaseTagMap = "button">(
	{ size, format, color, variant, active, fullWidth, glass, animation, ripple = true, ...props }: TButton<T> = {
		tag: "button",
	},
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([
		"btn",
		size,
		format,
		color,
		variant,
		active,
		fullWidth ? "btn-block" : "",
		glass ? "glass" : "",
		animation ? "no-animation" : "",
		ripple ? "relative overflow-hidden" : "",
		props.className,
	]);

	const objButton = Base({
		...props,
		tag: "button",
		className,
	});

	ripple &&
		objButton.addEventListener("click", (event) => {
			const ripple = RippleEffect(event);
			objButton.append(ripple);
		});

	return objButton as HTMLElementTagNameMap[T];
}
