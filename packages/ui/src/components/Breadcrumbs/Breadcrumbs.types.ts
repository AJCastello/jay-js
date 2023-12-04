import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type IBreadcrumbs = IBaseElement & Partial<Omit<HTMLDivElement, "style" | "children">>;