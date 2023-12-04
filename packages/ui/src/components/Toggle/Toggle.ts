import { Input } from "../Input/Input.js";
import { IToggle } from "./Toggle.types.js";
import { Typography } from "../Typography/Typography.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Toggle({
  label,
  color,
  size,
  position = "toggle-after",
  formControl,
  ...props
}: IToggle = {}): HTMLDivElement | HTMLInputElement {
  const className = mergeClasses([
    "toggle",
    color,
    size,
    props.className,
  ]);

  const toggleElement = Input<IToggle>({
    ...props,
    type: "checkbox",
    className,
  }) as HTMLInputElement;

  if (label) {
    const labelElement = BaseElement({
      tag: "label",
      className: "label cursor-pointer justify-start gap-2",
    });

    const labelText = Typography({
      variant: "span",
      className: "label-text",
      children: label,
    });

    labelElement.append(labelText);

    if (position === "toggle-before") {
      labelElement.append(toggleElement);
    } else {
      labelElement.prepend(toggleElement);
    }

    const formControlContainer = BaseElement({
      ...formControl,
      className: mergeClasses(["form-control", formControl?.className]),
      children: labelElement,
    }) as HTMLDivElement;
    
    return formControlContainer;
  }

  return toggleElement;
}