import "./TextInput.style.css";

import { Box } from "../Box/Box.js";
import { Input } from "../Input/Input.js";
import { TTextInput } from "./TextInput.types.js";
import { Typography } from "../Typography/Typography.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base, TBaseTagMap } from "../Base";

export function TextInput<T extends TBaseTagMap = "div">({
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
}: TTextInput<T> = { tag: "div"}): HTMLElementTagNameMap[T] {

  const className = mergeClasses([
    "input",
    bordered ? "input-bordered" : "",
    ghost ? "input-ghost" : "",
    color,
    inputSize,
    props.className,
    "input-placeholder"
  ]);

  const inputElement = Input({
    ...props,
    tag: "input",
    placeholder: " ",
    className
  }) as HTMLInputElement;

  const inputId = inputElement.id;

  const formControl = Box({
    className: "form-control relative"
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
      tag: "label",
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
    const helperElement = Base({
      tag: "label",
      className: "label",
      dataset: {
        helper: inputId
      }
    });
    helperElement.append(...helpers);
    formControl.append(helperElement);
  }

  return formControl as HTMLElementTagNameMap[T];
}

