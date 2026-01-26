import { cn } from "../../utils";
import type { TCollapseContent } from "./collapse-content.types";

export function CollapseContent({ className, children, ...props }: TCollapseContent = {}) {
	const mergedClassName = cn("collapse-content", className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
