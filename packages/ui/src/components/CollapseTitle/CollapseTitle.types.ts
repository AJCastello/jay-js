import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface ICollapseTitleExt extends IBaseElement {
  summary?: boolean;
}

export type ICollapseTitle = ICollapseTitleExt & Partial<Omit<HTMLDivElement, "style" | "children">>;