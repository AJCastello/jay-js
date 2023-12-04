import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IResizableSplitter extends IBaseElement {
  direction?: "horizontal" | "vertical";
}