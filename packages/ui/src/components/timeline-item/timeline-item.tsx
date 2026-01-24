import { cn } from "../../utils/cn";
import type { ITimelineItem } from "./timeline-item.types";

export function TimelineItem({ component, boxed, className, children, ...props }: ITimelineItem = {}) {
	const mergedClassName = cn(component, boxed ? "timeline-box" : "", className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
