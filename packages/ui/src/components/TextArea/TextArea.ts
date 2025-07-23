import { mergeClasses } from "../../utils/merge-classes.js";
import { type TBaseTagMap } from "../Base";
import { Base } from "../Base/Base.js";
import type { TTextArea } from "./TextArea.types.js";

export function TextArea<T extends TBaseTagMap = "textarea">(
	{
		className,
		variant,
		color,
		fullWidth,
		size,
		...props
	}: TTextArea<T> = { tag: "textarea" },
): HTMLElementTagNameMap[T] {

	const textareaElement = Base({
		...props,
		tag: "textarea",
	});

	const classNames = [
		"textarea",
		variant,
		color,
		size,
		className,
		fullWidth ? "w-full" : ""
	];

	textareaElement.className = mergeClasses(classNames);
	return textareaElement as HTMLElementTagNameMap[T];
}
