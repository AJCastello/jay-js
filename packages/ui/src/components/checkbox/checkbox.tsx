import { cn } from "../../utils";
import type { TCheckbox } from "./checkbox.types";

export function Checkbox({ className, color, size, indeterminate, onmount, ...props }: TCheckbox = {}) {
	return (
		<input
			{...props}
			type="checkbox"
			className={cn("checkbox", color, size, className)}
			onmount={(element) => {
				if (indeterminate && element instanceof HTMLInputElement) {
					element.indeterminate = true;
				}
				return onmount?.(element);
			}}
		/>
	);
}
