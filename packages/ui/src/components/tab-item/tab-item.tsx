import { cn } from "../../utils/cn";
import type { TTabItem } from "./tab-item.types";

export function TabItem({ size, active, disabled, className, children, ...props }: TTabItem = {}) {
	return (
		<a
			{...(props as any)}
			role="tab"
			className={cn("tab", active ? "tab-active" : "", disabled ? "tab-disabled" : "", size, className)}
		>
			{children}
		</a>
	);
}
