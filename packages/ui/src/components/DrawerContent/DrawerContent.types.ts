import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IDrawerContent extends IBaseElement {
  position?: "top" | "left" | "right" | "bottom";
}