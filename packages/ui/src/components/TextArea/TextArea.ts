import "./TextArea.style.css";

import { Box } from "../Box/Box.js";
import { ITextarea } from "./TextArea.types.js";
import { Typography } from "../Typography/Typography.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function TextArea({
  value,
  label,
  labelAlt,
  helpers,
  placeholder,
  bordered,
  ghost,
  color,
  size,
  ...props
}: ITextarea = {}): HTMLDivElement {

  const className = mergeClasses([
    "textarea",
    bordered ? "textarea-bordered" : "",
    ghost ? "textarea-ghost" : "",
    color,
    size,
    props.className,
    "textarea-placeholder",
  ]);

  const textareaElement = BaseElement<ITextarea>({
    ...props,
    tag: "textarea",
    placeholder: " ",
    className,
  }) as HTMLTextAreaElement;

  const inputId = textareaElement.id;

  const formControl = Box({
    className: "form-control relative"
  });

  if (label) {
    const labelElement = BaseElement({
      tag: "label",
      className: "label",
    });

    const labelText = Typography({
      variant: "span",
      className: "label-text",
      children: label,
    });

    labelElement.append(labelText);

    if (labelAlt) {
      const labelTextAlt = Typography({
        variant: "span",
        className: "label-text-alt",
        children: labelAlt,
      });
      labelElement.append(labelTextAlt);
    }
    formControl.append(labelElement);
  }

  if (placeholder) {
    const placeholderElement = Typography({
      variant: "label",
      className: "textarea-placeholder-label bg-base-100 rounded px-2",
      children: placeholder,
    });

    formControl.append(
      Box({
        className: "relative w-full flex flex-col",
        children: [textareaElement, placeholderElement],
      })
    );
  } else {
    formControl.append(textareaElement);
  }

  if (helpers) {
    const helperElement = BaseElement({
      tag: "label",
      className: "label",
      dataset: {
        helper: inputId
      }
    });
    helperElement.append(...helpers);
    formControl.append(helperElement);
  }

  return formControl;
}
