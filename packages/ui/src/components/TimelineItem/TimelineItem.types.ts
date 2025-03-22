import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type ITimelineItem<T extends TBaseTagMap> = {
	component?: "timeline-start" | "timeline-middle" | "timeline-end";
	boxed?: boolean;
} & TBase<T>;
