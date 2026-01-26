import { cn } from "../../utils/cn";
import type { TDropdownContent } from "./dropdown-content.types";

export function DropdownContent({ className, children, ...props }: TDropdownContent = {}) {
	return (
		<div {...(props as any)} className={cn("dropdown-content", className)}>
			{children}
		</div>
	);
}
