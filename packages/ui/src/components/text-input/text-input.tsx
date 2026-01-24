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
}: TTextInput = {}) {
	const inputId =
		(props as any).id ?? (props as any).name ?? `jay-ui-text-input-${Math.random().toString(36).slice(2)}`;

	const inputElement = (
		<input
			{...(props as any)}
			id={inputId}
			className={
				startAdornment || endAdornment
					? cn(className)
					: cn("input", variant, color, inputSize, className, fullWidth ? "w-full" : "")
			}
		/>
	) as HTMLInputElement;

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
