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
	id,
	...props
}: TTextInput = {}) {
	const inputId = typeof id === "string" ? id : `jay-ui-text-input-${Math.random().toString(36).slice(2)}`;

	const inputElement = (
		<input
			{...props}
			id={inputId}
			className={
				startAdornment || endAdornment
					? cn(className)
					: cn("input", variant, color, inputSize, className, fullWidth ? "w-full" : "")
			}
		/>
	);

	function getStartAdornment() {
		if (!startAdornment) {
			return null;
		}
		if (typeof startAdornment === "function") {
			if (inputElement instanceof HTMLInputElement) {
				return startAdornment(inputElement);
			}
			throw new Error("TextInput: startAdornment callback requires a synchronous <input> element");
		}
		return startAdornment;
	}

	function getEndAdornment() {
		if (!endAdornment) {
			return null;
		}
		if (typeof endAdornment === "function") {
			if (inputElement instanceof HTMLInputElement) {
				return endAdornment(inputElement);
			}
			throw new Error("TextInput: endAdornment callback requires a synchronous <input> element");
		}
		return endAdornment;
	}

	if (startAdornment || endAdornment) {
		return (
			<label
				htmlFor={inputId}
				className={cn("input", variant, color, fullWidth ? "w-full" : "", inputSize, containerClassName)}
			>
				{getStartAdornment()}
				{inputElement}
				{getEndAdornment()}
			</label>
		);
	}
	return inputElement;
}
