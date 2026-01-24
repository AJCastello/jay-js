import { cn } from "../../utils/cn";
import type { TStepItem } from "./step-item.types";

export function StepItem({ color, className, children, ...props }: TStepItem = {}) {
	const mergedClassName = cn("step", color, className);
	return (
		<li {...props} className={mergedClassName}>
			{children}
		</li>
	);
}
