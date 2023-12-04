import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type IForm = IBaseElement & Partial<Omit<HTMLFormElement, "style" | "children">>;