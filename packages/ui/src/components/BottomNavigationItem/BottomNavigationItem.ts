import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { IBottomNavigationItem } from "./BottomNavigationItem.types.js";

export function BottomNavigationItem({
  active,
  disabled,
  ...props
}: IBottomNavigationItem = {}): HTMLDivElement {
  const className = mergeClasses([
    "btm-nav-item",
    active ? "active" : "",
    disabled ? "disabled" : "",    
    props.className
  ]);

  return BaseElement<IBottomNavigationItem>({
    ...props,
    className
  }) as HTMLDivElement;
}
