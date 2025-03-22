import "./TextArea.style.css";

import { mergeClasses } from "../../utils/mergeClasses.js";
import type { TBaseTagMap } from "../Base";
import { Base } from "../Base/Base.js";
import { Box } from "../Box/Box.js";
import { Typography } from "../Typography/Typography.js";
import type { TTextarea } from "./TextArea.types.js";

export function TextArea<T extends TBaseTagMap = "div">(
	{ label, labelAlt, helpers, placeholder, bordered, ghost, color, size, ...props }: TTextarea<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([
		"textarea",
		bordered ? "textarea-bordered" : "",
		ghost ? "textarea-ghost" : "",
		color,
		size,
		props.className,
		"textarea-placeholder",
	]);

	const textareaElement = Base({
		...props,
		tag: "textarea",
		placeholder: " ",
		className,
	}) as HTMLTextAreaElement;

	const inputId = textareaElement.id;

	const formControl = Box({
		className: "form-control relative",
	});

	if (label) {
		const labelElement = Base({
			tag: "label",
			className: "label",
		});

		const labelText = Typography({
			tag: "span",
			className: "label-text",
			children: label,
		});

		labelElement.append(labelText);

		if (labelAlt) {
			const labelTextAlt = Typography({
				tag: "span",
				className: "label-text-alt",
				children: labelAlt,
			});
			labelElement.append(labelTextAlt);
		}
		formControl.append(labelElement);
	}

	if (placeholder) {
		const placeholderElement = Typography({
			tag: "label",
			className: "textarea-placeholder-label bg-base-100 rounded px-2",
			children: placeholder,
		});

		formControl.append(
			Box({
				className: "relative w-full flex flex-col",
				children: [textareaElement, placeholderElement],
			}),
		);
	} else {
		formControl.append(textareaElement);
	}

	if (helpers) {
		const helperElement = Base({
			tag: "label",
			className: "label",
			dataset: {
				helper: inputId,
			},
		});
		helperElement.append(...helpers);
		formControl.append(helperElement);
	}

	return formControl as HTMLElementTagNameMap[T];
}
