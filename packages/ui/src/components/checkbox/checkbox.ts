import { Input } from "@jay-js/elements";
import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils";
import type { TCheckbox } from "./checkbox.types";

export function Checkbox<T extends TBaseTagMap = "input">(
	{ className, color, size, indeterminate, ...props }: TCheckbox<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	const checkboxElement = Input({
		...props,
		tag: "input",
		type: "checkbox",
		className: cn("checkbox", color, size, className),
	}) as HTMLInputElement;

	if (indeterminate) {
		checkboxElement.indeterminate = true;
	}

	return checkboxElement as HTMLElementTagNameMap[T];
}
