import { mergeClasses } from "../../utils";
import { Box, IBox } from "../Box";

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