import { cn } from "../../utils/cn";
import type { TCollapseTitle } from "./collapse-title.types";

export function CollapseTitle({ className, children, ...props }: TCollapseTitle = {}) {
	const mergedClassName = cn("collapse-title", className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
