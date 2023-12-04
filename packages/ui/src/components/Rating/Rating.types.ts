import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IRatingExt extends IBaseElement {
  size?: "rating-lg" | "rating-md" | "rating-sm" | "rating-xs";
  half?: boolean;
  hidden?: boolean;
}

export type IRating = IRatingExt & Partial<Omit<HTMLDivElement, "style" | "children">>;