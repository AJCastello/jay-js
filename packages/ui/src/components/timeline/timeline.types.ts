import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TTimeline<T extends TBaseTagMap> = {
	direction?: "timeline-vertical" | "timeline-horizontal";
	compact?: boolean;
} & TBase<T>;
