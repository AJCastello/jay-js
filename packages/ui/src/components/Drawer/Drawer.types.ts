import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IDrawer extends IBaseElement {
  asChild?: boolean;
  position?: "top" | "left" | "right" | "bottom";
}
