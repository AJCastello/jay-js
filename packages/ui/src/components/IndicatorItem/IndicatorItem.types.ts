import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IIndicatorItemExt extends IBaseElement {
  vertical?: "indicator-top" | "indicator-middle" | "indicator-bottom";
  horizontal?: "indicator-start" | "indicator-center" | "indicator-end";
}

export type IIndicatorItem = IIndicatorItemExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
