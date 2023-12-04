import { IBox } from "../Box/Box.js";

export interface ITimelineItemsExt extends IBox {
  /** */
}

export type ITimelineItems = ITimelineItemsExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

