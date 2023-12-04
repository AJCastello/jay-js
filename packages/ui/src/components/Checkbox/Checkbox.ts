import { BaseElement } from "../BaseElement/BaseElement.js";
import { Box } from "../Box/index.js";
import { Input } from "../Input/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { ICheckbox } from "./Checkbox.types.js";

export function Checkbox({
  label,
  color,
  size,
  position = "checkbox-after",
  formControl,
  ...props
}: ICheckbox = {}): HTMLDivElement | HTMLInputElement {
  const className = mergeClasses([
    "checkbox",
    color,
    size,
    props.className,
  ]);

  const checkboxElement = Input<ICheckbox>({
    ...props,
    type: "checkbox",
    className,
  }) as HTMLInputElement;

  if (label) {
    const labelElement = BaseElement({
      tag: "label",
      className: "label cursor-pointer justify-start gap-2",
      children: label
    });

    if (position === "checkbox-before") {
      labelElement.append(checkboxElement);
    } else {
      labelElement.prepend(checkboxElement);
    }

    const formControlContainer = Box({
      ...formControl,
      className: mergeClasses(["form-control", formControl?.className]),
      children: labelElement,
    });

    return formControlContainer;
  }

  return checkboxElement;
}
