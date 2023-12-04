import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type IDropdownContent = IBaseElement & Partial<Omit<HTMLDivElement, "style">>;