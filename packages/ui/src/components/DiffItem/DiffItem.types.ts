import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IDiffItemExt extends IBaseElement {
  side?: "left" | "right";
}

export type IDiffItem = IDiffItemExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
