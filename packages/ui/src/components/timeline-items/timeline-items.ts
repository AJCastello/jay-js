import { Base, type TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TTimelineItems } from "./timeline-items.types";

export function TimelineItems<T extends TBaseTagMap = "li">(
	{ ...props }: TTimelineItems<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	const className = cn(props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
