import { cn } from "../../utils/cn";
import type { TSwapItem } from "./swap-item.types";

export function SwapItem({ state, className, children, ...props }: TSwapItem = {}) {
	const mergedClassName = cn(state, className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
