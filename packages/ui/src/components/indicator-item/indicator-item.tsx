import { cn } from "../../utils/cn";
import type { TIndicatorItem } from "./indicator-item.types";

export function IndicatorItem({ horizontal, vertical, className, children, ...props }: TIndicatorItem = {}) {
	const mergedClassName = cn("indicator-item", horizontal, vertical, className);
	return (
		<span {...props} className={mergedClassName}>
			{children}
		</span>
	);
}
