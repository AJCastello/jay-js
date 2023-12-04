import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type IDiff = IBaseElement & Partial<Omit<HTMLDivElement, "style" | "children">>;
