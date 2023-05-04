import { BaseElement, IBaseElement, Typography, Section } from "..";

export interface IToggle extends IBaseElement {
  id?: string;
  value?: string;
  label?: string;
  checked?: boolean;
  className?: string;
  color?: "toggle-primary" |  "toggle-secondary" |  "toggle-accent" |  "toggle-success" |  "toggle-warning" |  "toggle-info" |  "toggle-error" ;
  size?: "toggle-lg" | "toggle-md" | "toggle-sm" | "toggle-xs";
  position?: "before" | "after";
  formControl?: IBaseElement;
}

export function Toggle({
  id,
  value,
  label,
  checked,
  className,
  color,
  size,
  position = "after",
  formControl,
  ...props
}: IToggle): HTMLDivElement | HTMLInputElement {

  const classNameData = [
    "toggle",
    color,
    size,
    className || "",
  ].filter(Boolean).join(" ").trim();

  const toggleElement = BaseElement({
    id,
    tag: "input",
    className: classNameData,
    ...props,
  }) as HTMLInputElement;

  toggleElement.type = "checkbox";
  toggleElement.value = value || "";
  toggleElement.checked = checked || false;

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
      labelElement.append(toggleElement);
    } else {
      labelElement.prepend(toggleElement);
    }

    const formControlEl = Section({
      ...formControl,
      className: `form-control ${formControl?.className || ""}`,
      content: labelElement,
    });

    return formControlEl;
  }

  return toggleElement;
}
