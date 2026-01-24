import { cn } from "../../utils/cn";
import type { IBadge } from "./badge.types";

export function Badge({ className, variant, color, size, children, ...props }: IBadge<"span">) {
	return (
		<span {...(props as any)} className={cn("badge", variant, color, size, className)}>
			{children}
		</span>
	);
}
