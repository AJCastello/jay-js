import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface ITimelineExt extends IBaseElement {
  direction?: "timeline-vertical" | "timeline-horizontal";
  compact?: boolean;
}

export type ITimeline = ITimelineExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
