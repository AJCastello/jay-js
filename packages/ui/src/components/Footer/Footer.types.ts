import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IFooterExt extends IBaseElement {
  position?: "footer-center";
}

export type IFooter = IFooterExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

