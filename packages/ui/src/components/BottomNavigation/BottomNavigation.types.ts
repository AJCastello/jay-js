import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IBottomNavigationExt extends IBaseElement {
  size?: "btm-nav-xs" | "btm-nav-sm" | "btm-nav-md" | "btm-nav-lg";
}

export type IBottomNavigation = IBottomNavigationExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
