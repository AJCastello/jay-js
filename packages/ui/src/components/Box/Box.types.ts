import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type IBox = IBaseElement & Partial<Omit<HTMLDivElement, "style" | "children">>;