import { cn } from "../../utils";
import type { TTextInput } from "./text-input.types";

export function TextInput({
	className,
	containerClassName,
	variant,
	color,
	fullWidth,
	inputSize,
	startAdornment,
	endAdornment,
	...props
}: TTextInput = {}): HTMLInputElement | HTMLLabelElement {
	const inputElement = (<input {...(props as any)} />) as unknown as HTMLInputElement;

	const inputId =
		(props as any).id ?? (props as any).name ?? `jay-ui-text-input-${Math.random().toString(36).slice(2)}`;
	inputElement.id = inputId;

	function getStartAdornment() {
		if (!startAdornment) {
			return null;
		}
		return typeof startAdornment === "function" ? startAdornment(inputElement) : startAdornment;
	}

	function getEndAdornment() {
		if (!endAdornment) {
			return null;
		}
		return typeof endAdornment === "function" ? endAdornment(inputElement) : endAdornment;
	}

	if (startAdornment || endAdornment) {
		inputElement.className = cn(className);

		return (
			<label
				htmlFor={inputId}
				className={cn("input", variant, color, fullWidth ? "w-full" : "", inputSize, containerClassName)}
			>
				{getStartAdornment()}
				{inputElement}
				{getEndAdornment()}
			</label>
		) as unknown as HTMLLabelElement;
	}

	inputElement.className = cn("input", variant, color, inputSize, className, fullWidth ? "w-full" : "");
	return inputElement;
}
