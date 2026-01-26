import { cn } from "../../utils/cn";
import type { TTimelineItems } from "./timeline-items.types";

export function TimelineItems({ className, children, ...props }: TTimelineItems = {}) {
	const mergedClassName = cn(className);
	return (
		<li {...props} className={mergedClassName}>
			{children}
		</li>
	);
}
