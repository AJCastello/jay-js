import { cn } from "../../utils";
import type { TMenuItem } from "./menu-item.types";

export function MenuItem({ disabled, active, focus, className, children, ...props }: TMenuItem = {}) {
	return (
		<li
			{...(props as any)}
			className={cn(disabled ? "disabled" : "", active ? "active" : "", focus ? "focus" : "", className)}
		>
			{children}
		</li>
	);
}
