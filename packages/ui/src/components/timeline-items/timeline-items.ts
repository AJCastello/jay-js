import { TBaseTagMap, mergeClasses, ListItem } from "@jay-js/elements";
import { TTimelineItems } from "./timeline-items.types";

export function TimelineItems<T extends TBaseTagMap = "li">(
	{ ...props }: TTimelineItems<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(props.className);

	return ListItem({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
