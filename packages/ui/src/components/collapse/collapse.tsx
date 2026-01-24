import { cn } from "../../utils/cn";
import type { TCollapse } from "./collapse.types";

export function Collapse({ variant, forceOpen, forceClose, className, children, ...props }: TCollapse = {}) {
	const mergedClassName = cn(
		"collapse",
		variant,
		forceOpen ? "collapse-open" : "",
		forceClose ? "collapse-close" : "",
		className,
	);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
