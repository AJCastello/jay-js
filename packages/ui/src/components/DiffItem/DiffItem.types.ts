import { IBox } from "../Box/Box.js";

export interface IDiffItemExt extends IBox {
  side?: "left" | "right";
}

export type IDiffItem = IDiffItemExt &
  Partial<Omit<HTMLDivElement, "style" | "children">>;
