import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface INavbarComponentExt extends IBaseElement {
    component?: "navbar-start" | "navbar-center" | "navbar-end";
}

export type INavbarComponent = INavbarComponentExt &  Partial<Omit<HTMLDivElement, "style" | "children">>;