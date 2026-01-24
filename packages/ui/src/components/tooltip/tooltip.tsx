import { cn } from "../../utils/cn";
import type { TTooltip } from "./tooltip.types";

export function Tooltip({
	className,
	tip,
	color,
	position = "tooltip-top",
	forceOpen = false,
	children,
	...props
}: TTooltip = {}) {
	const tooltipClassName = cn("tooltip", position, forceOpen ? "tooltip-open" : "", color, className);

	return (
		<div {...(props as any)} className={tooltipClassName} dataset={{ tip }}>
			{children}
		</div>
	);
}
