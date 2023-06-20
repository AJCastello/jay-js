import { BaseElement, IBaseElement, Typography, Section } from "..";

export interface ICheckBox extends IBaseElement {
  value?: string;
  label?: string;
  checked?: boolean;
  className?: string;
  color?: "checkbox-primary" |  "checkbox-secondary" |  "checkbox-accent" |  "checkbox-success" |  "checkbox-warning" |  "checkbox-info" |  "checkbox-error" ;
  size?: "checkbox-lg" | "checkbox-md" | "checkbox-sm" | "checkbox-xs";
  position?: "checkbox-before" | "checkbox-after";
  formControl?: IBaseElement;
}


export function CheckBox({
  value,
  label,
  checked,
  className,
  color,
  size,
  position = "checkbox-after",
  formControl,
  ...props
}: ICheckBox): HTMLDivElement | HTMLInputElement {

  const classNameData = [
    "checkbox",
    color,
    size,
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

    if (position === "checkbox-before") {
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
