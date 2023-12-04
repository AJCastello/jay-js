import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type ISelectItem = IBaseElement & Partial<Omit<HTMLOptionElement, "style" | "children">>