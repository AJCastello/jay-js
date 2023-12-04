import { IBox } from "../Box/Box.js";

export interface IDiffExt extends IBox {
 // options
}

export type IDiff = IDiffExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

