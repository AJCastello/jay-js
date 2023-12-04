import { IBaseElement } from "../BaseElement/BaseElement.types.js";
export type IImg = IBaseElement & Partial<Omit<HTMLImageElement, "style">>;
