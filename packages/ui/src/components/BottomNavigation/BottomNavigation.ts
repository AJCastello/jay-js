import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBottomNavigation } from "./BottomNavigation.types.js";

export function BottomNavigation({
  size,
  ...props
}: IBottomNavigation = {}): HTMLDivElement {
  const className = mergeClasses([
    "btm-nav",
    size,
    props.className,
  ]);

  return BaseElement<IBottomNavigation>({
    ...props,
    className
  }) as HTMLDivElement;;
}
