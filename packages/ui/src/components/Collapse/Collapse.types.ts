import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface ICollapse extends IBaseElement {
  details?: boolean;
  variant?: "collapse-arrow" | "collapse-plus";
  forceOpen?: boolean;
  forceClose?: boolean;
}