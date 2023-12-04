import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface ICard extends IBaseElement {
  imagePosition?: "left" | "right";
  imageFull?: boolean;
  variant?: "card-bordered";
  format?: "card-compact" | "card-normal";
  ripple?: boolean;
}
