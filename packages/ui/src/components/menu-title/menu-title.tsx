import { cn } from "../../utils/cn";
import type { TMenuTitle } from "./menu-title.types";

export function MenuTitle({ className, children, ...props }: TMenuTitle = {}) {
	return (
		<li {...(props as any)} className={cn("menu-title", className)}>
			{children}
		</li>
	);
}
