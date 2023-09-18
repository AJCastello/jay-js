import { Box, IBaseElement, IBox, ITypography, Typography } from "..";
import { mergeClasses } from "../../";

export interface IDropdown extends IBaseElement {
  position?: "dropdown-top" | "dropdown-bottom" | "dropdown-left" | "dropdown-right";
  openOnHover?: boolean;
  forceOpen?: boolean;
  toEnd?: boolean;
}

export function DropdownContent({ ...props }: IBox): HTMLDivElement {
  const className = mergeClasses([
    "dropdown-content",
    props.className
  ]);
  const dropdownContent = Box({
    ...props,
    className,
    tabIndex: 0
  }) as HTMLDivElement;
  return dropdownContent;
}

export function DropdownLabel({ ...props }: ITypography): HTMLLabelElement {
  const dropdownLabel = Typography({
    ...props,
    tabIndex: 0,
    variant: "label"
  }) as HTMLLabelElement;
  return dropdownLabel;
}

export function Dropdown({
  position = "dropdown-bottom",
  openOnHover,
  forceOpen,
  toEnd,
  ...props
}: IDropdown): HTMLDivElement {
  const className = mergeClasses([
    "dropdown",
    position,
    openOnHover ? "dropdown-hover" : "",
    forceOpen ? "dropdown-open" : "",
    toEnd ? "dropdown-end" : "",
    props.className,
  ]);

  const dropdownElement = Box({
    ...props,
    className,
  }) as HTMLDivElement;

  return dropdownElement;
}
