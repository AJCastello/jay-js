import { cn } from "../../utils";
import type { TTimeline } from "./timeline.types";

export function Timeline({ direction, compact, className, children, ...props }: TTimeline = {}) {
	const mergedClassName = cn("timeline", direction, compact ? "timeline-compact" : "", className);
	return (
		<ul {...props} className={mergedClassName}>
			{children}
		</ul>
	);
}
