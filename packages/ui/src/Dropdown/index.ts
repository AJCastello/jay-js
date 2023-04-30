import { BaseElement, IBaseElement, ISection, ITypography, Section, Typography } from "..";

export interface IDropdown extends IBaseElement {
  id?: string;
  className?: string;
  label: Partial<ITypography>;
  popover: Partial<ISection>;
  position?: "top" | "bottom" | "left" | "right";
  openOnHover?: boolean;
  forceOpen?: boolean;
  toEnd?: boolean;
}

export function Dropdown({
  id,
  className,
  label,
  popover,
  position,
  openOnHover,
  forceOpen,
  toEnd,
  ...props
}: IDropdown) {
  const classNameData = [
    "dropdown",
    position ? `dropdown-${position}` : "",
    openOnHover ? "dropdown-hover" : "",
    forceOpen ? "dropdown-open" : "",
    toEnd ? "dropdown-end" : "",
    className || "",
  ].filter(Boolean).join(" ").trim();

  const dropdownElement = BaseElement({
    tag: "div",
    id,
    className: classNameData,
    ...props,
  });

  const labelElement = Typography({
    ...label,
    variant: label.variant || "label",
    className: `btn ${label.className || ""}`,
    tabIndex: 0
  });

  dropdownElement.append(labelElement);

  const contentElement = Section({
    ...popover,
    className: `dropdown-content ${popover.className || ""}`,
    tabIndex: 0
  });

  dropdownElement.append(contentElement);

  return dropdownElement;
}
