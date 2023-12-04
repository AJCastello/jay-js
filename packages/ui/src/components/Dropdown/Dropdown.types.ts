import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IDropdown extends IBaseElement {
  position?: "dropdown-top" | "dropdown-bottom" | "dropdown-left" | "dropdown-right";
  openOnHover?: boolean;
  forceOpen?: boolean;
  toEnd?: boolean;
}
