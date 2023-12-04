import { IBaseElement } from "../BaseElement/BaseElement.types.js";

interface ITabItemExt extends IBaseElement {
  size?: "tab-xs" | "tab-sm" | "tab-md" | "tab-lg";
  type?: "input" | "link";
  active?: boolean;
  disabled?: boolean;
}

export type ITabItem = ITabItemExt & Partial<Omit<HTMLAnchorElement, "style" | "children">>;
