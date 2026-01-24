import { cn } from "../../utils/cn";
import type { TSteps } from "./steps.types";

export function Steps({ orientation = "steps-horizontal", className, children, ...props }: TSteps = {}) {
	const mergedClassName = cn("steps", orientation, className);
	return (
		<ul {...props} className={mergedClassName}>
			{children}
		</ul>
	);
}
