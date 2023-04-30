import { BaseElement, IBaseElement, Typography, Section } from "..";

export interface ICheckBox extends IBaseElement {
  value?: string;
  label?: string;
  checked?: boolean;
  className?: string;
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "info" | "error";
  size?: "lg" | "md" | "sm" | "xs";
  position?: "before" | "after";
  formControl?: IBaseElement;
}

export function CheckBox({
  value,
  label,
  checked,
  className,
  color,
  size,
  position = "after",
  formControl,
  ...props
}: ICheckBox): HTMLDivElement | HTMLInputElement {

  const classNameData = [
    "checkbox",
    color ? `checkbox-${color}` : "",
    size ? `checkbox-${size}` : "",
    className || "",
  ].filter(Boolean).join(" ").trim();

  const checkboxElement = BaseElement({
    tag: "input",
    className: classNameData,
    ...props,
  }) as HTMLInputElement;

  checkboxElement.type = "checkbox";
  checkboxElement.value = value || "";
  checkboxElement.checked = checked ? true : false;

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

    if (position === "before") {
      labelElement.append(checkboxElement);
    } else {
      labelElement.prepend(checkboxElement);
    }

    const formControlEl = Section({
      ...formControl,
      className: `form-control ${formControl?.className || ""}`,
      content: labelElement,
    });

    return formControlEl;
  }

  return checkboxElement;
}
