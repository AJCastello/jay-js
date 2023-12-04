import { IBox } from "../Box/Box.js";

export interface ITimelineExt extends IBox {
  direction?: "timeline-vertical" | "timeline-horizontal";
  compact?: boolean;
}

export type ITimeline = ITimelineExt &
  Partial<Omit<HTMLDivElement, "style" | "children">>;
