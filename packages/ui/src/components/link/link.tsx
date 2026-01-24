import { cn } from "../../utils/cn";
import type { TLink } from "./link.types";

export function Link({ className, variant, color, children, ...props }: TLink = {}) {
	return (
		<a {...(props as any)} className={cn("link", variant, color, className)}>
			{children}
		</a>
	);
}
