import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { IDropdownContent } from "./DropdownContent.types.js";

export function DropdownContent({ ...props }: IDropdownContent): HTMLDivElement {
  const className = mergeClasses([
    "dropdown-content",
    props.className
  ]);
  
  return BaseElement({
    ...props,
    className,
    tabIndex: 0
  }) as HTMLDivElement;
}