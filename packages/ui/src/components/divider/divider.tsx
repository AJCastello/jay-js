import { cn } from "../../utils/cn";
import type { TDivider } from "./divider.types";
export function Divider({ className, orientation, children, ...props }: TDivider = {}) {
	return (
		<div {...(props as any)} className={cn("divider", orientation, className)}>
			{children}
		</div>
	);
}
