import { cn } from "../../utils";
import type { TCheckbox } from "./checkbox.types";

export function Checkbox({ className, color, size, indeterminate, ...props }: TCheckbox = {}): HTMLInputElement {
	const checkboxElement = (
		<input {...(props as any)} type="checkbox" className={cn("checkbox", color, size, className)} />
	) as HTMLInputElement;

	if (indeterminate) {
		checkboxElement.indeterminate = true;
	}

	return checkboxElement;
}
