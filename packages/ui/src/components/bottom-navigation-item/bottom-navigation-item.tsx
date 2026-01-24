import { cn } from "../../utils/cn";
import type { TBottomNavigationItem } from "./bottom-navigation-item.types";

export function BottomNavigationItem({
	active,
	disabled,
	className,
	children,
	...props
}: TBottomNavigationItem = {}): HTMLElementTagNameMap["a"] {
	return (
		<a {...(props as any)} className={cn(active ? "active" : "", disabled ? "disabled" : "", className)}>
			{children}
		</a>
	) as unknown as HTMLElementTagNameMap["a"];
}
