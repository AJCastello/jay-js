import { Box, IBaseElement } from "..";
import { mergeClasses } from "../../";

export interface IDropdown extends IBaseElement {
  position?: "dropdown-top" | "dropdown-bottom" | "dropdown-left" | "dropdown-right";
  openOnHover?: boolean;
  forceOpen?: boolean;
  toEnd?: boolean;
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
