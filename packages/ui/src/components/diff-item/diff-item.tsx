import { cn } from "../../utils/cn";
import type { TDiffItem } from "./diff-item.types";

export function DiffItem({ side, className, children, ...props }: TDiffItem = {}) {
	const mergedClassName = cn(side === "left" ? "diff-left" : "diff-right", className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
