import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface ITimelineItemExt extends IBaseElement {
  component?: "timeline-start" | "timeline-middle" | "timeline-end";
  boxed?: boolean;
}

export type ITimelineItem = ITimelineItemExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
