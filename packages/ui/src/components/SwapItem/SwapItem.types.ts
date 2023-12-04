import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface ISwapItemExt extends IBaseElement {
  state?: "swap-on" | "swap-off";
}

export type ISwapItem = ISwapItemExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
