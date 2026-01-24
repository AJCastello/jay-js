import { cn } from "../../utils";
import type { TMenuItem } from "./menu-item.types";

export function MenuItem({
	disabled,
	active,
	focus,
	className,
	children,
	...props
}: TMenuItem = {}): HTMLElementTagNameMap["li"] {
	return (
		<li
			{...(props as any)}
			className={cn(disabled ? "disabled" : "", active ? "active" : "", focus ? "focus" : "", className)}
		>
			{children}
		</li>
	) as unknown as HTMLElementTagNameMap["li"];
}
