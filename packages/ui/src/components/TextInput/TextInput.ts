import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { Typography } from "../Typography/Typography.js";
import { Input } from "../Input/Input.js";
import { Box } from "../Box/Box.js";

import { mergeClasses } from "../../utils/mergeClasses.js";

import "./TextInput.style.css";

export interface ITextInputExt extends IBaseElement {
  label?: string;
  labelAlt?: string;
  helpers?: Array<HTMLElement>;
  placeholder?: string;
  bordered?: boolean;
  ghost?: boolean;
  color?: "input-primary" | "input-secondary" | "input-accent" | "input-success" | "input-warning" | "input-info" | "input-error";
  inputSize?: "input-lg" | "input-md" | "input-sm" | "input-xs";
  startAdornment?: HTMLElement | ((inputElement: HTMLInputElement) => HTMLElement);
  endAdornment?: HTMLElement | ((inputElement: HTMLInputElement) => HTMLElement);
}

export type ITextInput = ITextInputExt & Partial<Omit<HTMLInputElement, "style" | "size" | "label">>;

export function TextInput({
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
}: ITextInput): HTMLDivElement {

  const className = mergeClasses([
    "input",
    bordered ? "input-bordered" : "",
    ghost ? "input-ghost" : "",
    color,
    inputSize,
    props.className,
    "input-placeholder"
  ]);

  const inputElement = Input<ITextInput>({
    ...props,
    placeholder: " ",
    className
  }) as HTMLInputElement;

  const inputId = inputElement.id;

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

  function getStartAdornment() {
    if (startAdornment) {
      return Box({
        className: "absolute left-3 top-1/2 z-2 transform -translate-y-1/2",
        children: typeof startAdornment === "function" ? startAdornment(inputElement) : startAdornment
      });
    }
    return "";
  }

  function getEndAdornment() {
    if (endAdornment) {
      return Box({
        className: "absolute right-3 top-1/2 z-2 transform -translate-y-1/2",
        children: typeof endAdornment === "function" ? endAdornment(inputElement) : endAdornment
      });
    }
    return "";
  }

  if (placeholder) {
    const placeholderElement = Typography({
      variant: "label",
      className: "input-placeholder-label bg-base-100 rounded px-2",
      children: placeholder
    });

    formControl.append(Box({
      className: "relative w-full flex flex-col",
      children: [
        getStartAdornment(),
        inputElement,
        placeholderElement,
        getEndAdornment()
      ]
    }));
  } else {
    formControl.append(
      getStartAdornment(),
      inputElement,
      getEndAdornment()
    );
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

