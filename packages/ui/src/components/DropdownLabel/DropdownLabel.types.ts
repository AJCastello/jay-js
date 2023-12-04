import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type IDropdownLabel = IBaseElement & Partial<Omit<HTMLDivElement, "style">>;