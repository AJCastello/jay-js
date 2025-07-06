import "./TextInput.style.css";

import { mergeClasses } from "../../utils/merge-classes.js";
import { type TBaseTagMap } from "../Base";
import { Box } from "../Box/Box.js";
import { Input } from "../Input/Input.js";
import type { TTextInput } from "./TextInput.types.js";

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
		inputElement.className = mergeClasses([className]);

		const containerClassNames = [
			"input",
			color,
			fullWidth ? "w-full" : "",
			inputSize,
			containerClassName
		]

		const inputLabelContainer = Box({
			tag: "label",
			className: mergeClasses(containerClassNames),
			children: [
				getStartAdornment(),
				inputElement,
				getEndAdornment(),
			]
		})
		return inputLabelContainer as HTMLElementTagNameMap[T];
	}

	const classNames = [
		"input",
		color,
		inputSize,
		className,
		fullWidth ? "w-full" : ""
	];

	inputElement.className = mergeClasses(classNames);
	return inputElement as HTMLElementTagNameMap[T];
}
