import { cn } from "../../utils/cn";
import type { TDiffResizer } from "./diff-resizer.types";

export function DiffResizer({ className, children, ...props }: TDiffResizer = {}) {
	const mergedClassName = cn("diff-resizer", className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
