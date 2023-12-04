import { IBaseElement } from "../BaseElement/index.js";

export type IList = IBaseElement & Partial<Omit<HTMLUListElement, "style" | "children">>;