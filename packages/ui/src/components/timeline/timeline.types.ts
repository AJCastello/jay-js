import type { TBase } from "@jay-js/system";

export type TTimeline = {
	direction?: "timeline-vertical" | "timeline-horizontal";
	compact?: boolean;
} & Omit<TBase<"ul">, "tag">;
