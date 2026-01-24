import { cn } from "../../utils/cn";
import type { TIndicator } from "./indicator.types";

export function Indicator({ className, children, ...props }: TIndicator = {}) {
	return (
		<div {...(props as any)} className={cn("indicator", className)}>
			{children}
		</div>
	);
}
