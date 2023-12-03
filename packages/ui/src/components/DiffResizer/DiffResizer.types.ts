import { IBox } from "../Box/Box.js";

export interface IDiffResizerExt extends IBox {
 // options
}

export type IDiffResizer = IDiffResizerExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

