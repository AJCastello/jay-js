import { Box } from "../Box/Box.js";
import { Input } from "../Input/Input.js";
import { IFileInput } from "./FileInput.types.js";
import { BaseElement } from "../BaseElement/index.js";
import { Typography } from "../Typography/Typography.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

import "./FileInput.style.css";

export function FileInput({
  label,
  labelAlt,
  helpers,
  bordered,
  ghost,
  color,
  inputSize,
  ...props
}: IFileInput): HTMLDivElement {
  const className = mergeClasses([
    "file-input",
    bordered ? "file-input-bordered" : "",
    ghost ? "file-input-ghost" : "",
    color,
    inputSize,
    props.className,
    "file-input-placeholder",
  ]);

  const inputElement = Input<IFileInput>({
    ...props,
    type: "file",
    placeholder: " ",
    className,
  }) as HTMLInputElement;

  const inputId = inputElement.id;

  const formControl = Box({
    className: "form-control relative",
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

  formControl.append(inputElement);

  if (helpers) {
    const helperElement = BaseElement({
      tag: "label",
      className: "label",
      dataset: {
        helper: inputId,
      },
    });
    helperElement.append(...helpers);
    formControl.append(helperElement);
  }

  return formControl;
}
