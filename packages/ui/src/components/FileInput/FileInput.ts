import { Box } from "../Box/Box.js";
import { Input } from "../Input/Input.js";
import { TFileInput } from "./FileInput.types.js";
import { Base, TBaseTagMap } from "../Base/index.js";
import { Typography } from "../Typography/Typography.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

import "./FileInput.style.css";

export function FileInput<T extends TBaseTagMap = "div">({
  label,
  labelAlt,
  helpers,
  bordered,
  ghost,
  color,
  inputSize,
  ...props
}: TFileInput<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
  
  const className = mergeClasses([
    "file-input",
    bordered ? "file-input-bordered" : "",
    ghost ? "file-input-ghost" : "",
    color,
    inputSize,
    props.className,
    "file-input-placeholder",
  ]);

  const inputElement = Input({
    ...props,
    tag: "input",
    type: "file",
    placeholder: " ",
    className,
  }) as HTMLInputElement;

  const inputId = inputElement.id;

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

  formControl.append(inputElement);

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
