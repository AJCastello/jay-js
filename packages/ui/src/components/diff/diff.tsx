import { cn } from "../../utils";
import type { TDiff } from "./diff.types";

export function Diff({ className, children, ...props }: TDiff = {}) {
	const mergedClassName = cn("diff", className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
