import { TBaseTagMap, mergeClasses, List } from "@jay-js/elements";
import type { TTimeline } from "./timeline.types.js";

export function Timeline<T extends TBaseTagMap = "ul">(
	{ direction, compact, ...props }: TTimeline<T> = { tag: "ul" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("timeline", direction, compact ? "timeline-compact" : "", props.className);

	return List({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
