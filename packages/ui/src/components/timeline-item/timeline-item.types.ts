import type { TBase } from "@jay-js/system";

export type ITimelineItem = {
	component?: "timeline-start" | "timeline-middle" | "timeline-end";
	boxed?: boolean;
} & Omit<TBase<"div">, "tag">;
