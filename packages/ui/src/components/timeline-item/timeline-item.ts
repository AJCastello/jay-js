import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { ITimelineItem } from "./timeline-item.types";

export function TimelineItem<T extends TBaseTagMap = "div">(
	{ component, boxed, ...props }: ITimelineItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn(component, boxed ? "timeline-box" : "", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
