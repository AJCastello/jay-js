import { cn } from "../../utils/cn";
import type { TDivider } from "./divider.types";

export function Divider({ className, orientation, children, ...props }: TDivider = {}): HTMLDivElement {
	return (
		<div {...(props as any)} className={cn("divider", orientation, className)}>
			{children}
		</div>
	) as unknown as HTMLDivElement;
}
