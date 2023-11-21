import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/index.js";

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