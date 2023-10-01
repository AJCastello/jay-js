import { BaseElement, IBaseElement, Typography, Box, Input } from "..";
import { mergeClasses } from "../../utils";

export interface IToggleExt extends IBaseElement {
  label?: string;
  className?: string;
  color?: "toggle-primary" | "toggle-secondary" | "toggle-accent" | "toggle-success" | "toggle-warning" | "toggle-info" | "toggle-error";
  size?: "toggle-lg" | "toggle-md" | "toggle-sm" | "toggle-xs";
  position?: "toggle-before" | "toggle-after";
  formControl?: IBaseElement;
}

export type IToggle = IToggleExt & Partial<Omit<HTMLInputElement, "style" | "size" | "label">>;

export function Toggle({
  label,
  color,
  size,
  position = "toggle-after",
  formControl,
  ...props
}: IToggle): HTMLDivElement | HTMLInputElement {
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
      content: label,
    });

    labelElement.append(labelText);

    if (position === "toggle-before") {
      labelElement.append(toggleElement);
    } else {
      labelElement.prepend(toggleElement);
    }

    const formControlContainer = Box({
      ...formControl,
      className: mergeClasses(["form-control", formControl?.className]),
      content: labelElement,
    });
    
    return formControlContainer;
  }

  return toggleElement;
}
