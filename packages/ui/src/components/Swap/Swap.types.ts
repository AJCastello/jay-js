import {  IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface ISwapExt extends IBaseElement {
  effect?: "swap-rotate" | "swap-flip";
}

export type ISwap = ISwapExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
