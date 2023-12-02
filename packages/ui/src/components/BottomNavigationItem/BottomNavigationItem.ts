import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement, IBaseElement } from "../BaseElement/BaseElement.js";

export interface IBottomNavigationItemExt extends IBaseElement {
  active?: boolean;
  disabled?: boolean;
}

export type IBottomNavigationItem = IBottomNavigationItemExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

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

  return BaseElement({
    ...props,
    className
  }) as HTMLDivElement;
}
