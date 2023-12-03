import { IBox } from "../Box/Box.js";

export interface ITimelineItemExt extends IBox {
  component?: "timeline-start" | "timeline-middle" | "timeline-end";
  boxed?: boolean;
}

export type ITimelineItem = ITimelineItemExt &
  Partial<Omit<HTMLDivElement, "style" | "children">>;
