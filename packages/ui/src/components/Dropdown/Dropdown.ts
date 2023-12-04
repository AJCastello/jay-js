import { IDropdown } from "./Dropdown.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

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

  return BaseElement<IDropdown>({
    ...props,
    className,
  }) as HTMLDivElement;
}
