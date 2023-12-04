import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface ITabs extends IBaseElement {
  variant?: "tabs-boxed" | "tabs-bordered" | "tabs-lifted";
}
