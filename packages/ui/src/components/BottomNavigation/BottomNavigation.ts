import { IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box } from "../Box/Box.js";

export interface IBottomNavigationExt extends IBaseElement {
  size?: "btm-nav-xs" | "btm-nav-sm" | "btm-nav-md" | "btm-nav-lg";
}

export type IBottomNavigation = IBottomNavigationExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

export function BottomNavigation({
  size,
  ...props
}: IBottomNavigation = {}): HTMLDivElement {
  const className = mergeClasses([
    "btm-nav",
    size,
    props.className,
  ]);

  return Box({
    ...props,
    className
  }) as HTMLDivElement;;
}
