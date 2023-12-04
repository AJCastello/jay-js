import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface ISection extends IBaseElement {
  variant?: "header" | "footer" | "main" | "aside" | "section" | "article" | "nav" | "div" ;
}
