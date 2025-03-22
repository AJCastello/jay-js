import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TTimeline<T extends TBaseTagMap> = {
	direction?: "timeline-vertical" | "timeline-horizontal";
	compact?: boolean;
} & TBase<T>;
