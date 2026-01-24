import { cn } from "../../utils/cn";
import type { TJoin } from "./join.types.js";

export function Join({ className, children, ...props }: TJoin = {}) {
	const mergedClassName = cn("join", className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
