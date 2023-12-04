import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type IListItem = IBaseElement & Partial<Omit<HTMLLIElement, "style" | "children">>
