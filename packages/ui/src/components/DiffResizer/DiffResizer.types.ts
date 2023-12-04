import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type IDiffResizer = IBaseElement & Partial<Omit<HTMLDivElement, "style" | "children">>;
