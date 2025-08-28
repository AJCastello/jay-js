import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { ITimelineItem } from "./timeline-item.types";

export function TimelineItem<T extends TBaseTagMap = "div">(
	{ component, boxed, ...props }: ITimelineItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(component, boxed ? "timeline-box" : "", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
