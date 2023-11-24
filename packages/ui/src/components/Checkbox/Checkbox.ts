import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { Box } from "../Box/index.js";
import { Input } from "../Input/index.js";

import { mergeClasses } from "../../utils/mergeClasses.js";

export interface ICheckboxExt extends IBaseElement {
  value?: string;
  label?: string | Node | (string | Node)[];
  checked?: boolean;
  color?: "checkbox-primary" | "checkbox-secondary" | "checkbox-accent" | "checkbox-success" | "checkbox-warning" | "checkbox-info" | "checkbox-error";
  size?: "checkbox-lg" | "checkbox-md" | "checkbox-sm" | "checkbox-xs";
  position?: "checkbox-before" | "checkbox-after";
  formControl?: IBaseElement;
}

export type ICheckbox = ICheckboxExt & Partial<Omit<HTMLInputElement, "style" | "size" | "label">>;

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
