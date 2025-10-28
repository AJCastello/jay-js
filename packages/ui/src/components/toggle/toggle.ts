import { Base, Input, type TBaseTagMap, Typography } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TToggle } from "./toggle.types";

export function Toggle<T extends TBaseTagMap = "div" | "input">(
	{ label, color, size, position = "toggle-after", formControl, ...props }: TToggle<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("toggle", color, size, props.className);

	const toggleElement = Input({
		...props,
		tag: "input",
		type: "checkbox",
		className,
	}) as HTMLInputElement;

	if (label) {
		const labelElement = Base({
			tag: "label",
			className: "label cursor-pointer justify-start gap-2",
		});

		const labelText = Typography({
			tag: "span",
			className: "label-text",
			children: label,
		});

		labelElement.append(labelText);

		if (position === "toggle-before") {
			labelElement.append(toggleElement);
		} else {
			labelElement.prepend(toggleElement);
		}

		const formControlContainer = Base({
			...formControl,
			className: cn("form-control", formControl?.className),
			children: labelElement,
		}) as HTMLDivElement;

		return formControlContainer as HTMLElementTagNameMap[T];
	}

	return toggleElement as HTMLElementTagNameMap[T];
}
