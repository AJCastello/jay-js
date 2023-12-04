import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type ILink = IBaseElement & Partial<Omit<HTMLAnchorElement, "style" | "children">>;
