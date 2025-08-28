import { TBaseTagMap, Input, mergeClasses, Box } from "@jay-js/elements";
import { TTextInput } from "./text-input.types";

export function TextInput<T extends TBaseTagMap = "input">(
	{
		className,
		containerClassName,
		variant,
		color,
		fullWidth,
		inputSize,
		startAdornment,
		endAdornment,
		...props
	}: TTextInput<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {

	const inputElement = Input({
		...props,
		tag: "input",
	});

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
		inputElement.className = mergeClasses(className);

		const inputLabelContainer = Box({
			tag: "label",
			className: mergeClasses(
				"input",
				color,
				fullWidth ? "w-full" : "",
				inputSize,
				containerClassName
			),
			children: [
				getStartAdornment(),
				inputElement,
				getEndAdornment(),
			]
		})
		return inputLabelContainer as HTMLElementTagNameMap[T];
	}

	inputElement.className = mergeClasses(
		"input",
		color,
		inputSize,
		className,
		fullWidth ? "w-full" : ""
	);
	return inputElement as HTMLElementTagNameMap[T];
}