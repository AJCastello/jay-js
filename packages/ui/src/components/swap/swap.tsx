import { cn } from "../../utils/cn";
import type { TSwap } from "./swap.types";

export function Swap({ effect, className, children, ...props }: TSwap = {}) {
	const mergedClassName = cn("swap", effect, className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
