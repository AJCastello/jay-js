import "./TextInput.style.css";

import { mergeClasses } from "../../utils/merge-classes.js";
import { Base, type TBaseTagMap } from "../Base";
import { Box } from "../Box/Box.js";
import { Input } from "../Input/Input.js";
import { Typography } from "../Typography/Typography.js";
import type { TTextInput } from "./TextInput.types.js";

export function TextInput<T extends TBaseTagMap = "input">(
	{
		label,
		labelAlt,
		helpers,
		placeholder,
		bordered,
		ghost,
		color,
		inputSize,
		startAdornment,
		endAdornment,
		...props
	}: TTextInput<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	//

	const className = mergeClasses([
		"input",
		ghost ? "input-ghost" : "",
		color,
		inputSize,
		props.className,
		"w-full",
		bordered ? "" : "border-none",
		placeholder ? "border-none" : "",
		"outline-none",
		"focus:outline-none",
	]);

	const fieldsetClassName = mergeClasses([
		"-top-1",
		"left-0",
		"right-0",
		"bottom-0",
		"absolute",
		"margin-0",
		"pointer-events-none",
		"overflow-hidden",
		"min-w-[0%]",
		"rounded-lg",
		color,
		bordered ? "input-bordered border" : "",
	]);

	const legendClassName = mergeClasses([
		"ml-2",
		"float-none",
		"w-auto",
		"block",
		"h-2",
		"text-xs",
		"invisible",
		"max-w-[0.01px]",
		"p-0",
		"whitespace-nowrap",
	]);

	const legendSpanClassName = mergeClasses(["opacity-0", placeholder ? "px-1" : "", "text-xs"]);

	const labelClassName = mergeClasses([
		"absolute",
		"top-[50%]",
		"left-3",
		"transform",
		"translate-y-[-50%]",
		"pointer-events-none",
		"transition-all",
		"duration-200",
		"ease-out",
		placeholder ? "px-1" : "",
	]);

	const inputElement = Input({
		...props,
		className,
		tag: "input",
		placeholder: " ",
	});

	function getLabels() {
		if (label || labelAlt) {
			return Box({
				className: "label",
				children: [
					label
						? Typography({
								tag: "span",
								className: "label-text",
								children: label,
							})
						: "",
					labelAlt
						? Typography({
								tag: "span",
								className: "label-text-alt",
								children: labelAlt,
							})
						: "",
				],
			});
		}
		return "";
	}

	function getHelpers() {
		if (helpers) {
			return Box({
				className: "label",
				children: helpers,
			});
		}
		return "";
	}

	function getStartAdornment() {
		if (startAdornment) {
			return Box({
				className: "absolute left-3 top-1/2 z-2 transform -translate-y-1/2",
				children: typeof startAdornment === "function" ? startAdornment(inputElement) : startAdornment,
			});
		}
		return "";
	}

	function getEndAdornment() {
		if (endAdornment) {
			return Box({
				className: "absolute right-3 top-1/2 z-2 transform -translate-y-1/2",
				children: typeof endAdornment === "function" ? endAdornment(inputElement) : endAdornment,
			});
		}
		return "";
	}

	return Box({
		tag: "div",
		className: "form-control  relative",
		children: [
			getLabels(),
			Box({
				className: "input-form-control relative",
				children: [
					getStartAdornment(),
					inputElement,
					placeholder
						? Typography({
								tag: "label",
								className: labelClassName,
								children: placeholder,
							})
						: "",
					Base({
						tag: "fieldset",
						className: fieldsetClassName,
						children: [
							Base({
								tag: "legend",
								className: legendClassName,
								children: Typography({
									tag: "span",
									className: legendSpanClassName,
									children: placeholder,
								}),
							}),
						],
					}),
					getEndAdornment(),
				],
			}),
			getHelpers(),
		],
	}) as HTMLElementTagNameMap[T];
}
