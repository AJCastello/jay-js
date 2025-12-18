import type { TBase, TBaseTagMap } from "@jay-js/system";

export type ITimelineItem<T extends TBaseTagMap> = {
	component?: "timeline-start" | "timeline-middle" | "timeline-end";
	boxed?: boolean;
} & TBase<T>;
