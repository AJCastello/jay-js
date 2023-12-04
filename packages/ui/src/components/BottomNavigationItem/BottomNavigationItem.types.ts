import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IBottomNavigationItemExt extends IBaseElement {
  active?: boolean;
  disabled?: boolean;
}

export type IBottomNavigationItem = IBottomNavigationItemExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
