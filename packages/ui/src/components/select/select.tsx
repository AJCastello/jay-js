import { cn } from "../../utils/cn";
import type { TSelect } from "./select.types";

export function Select({
	className,
	variant,
	color,
	size,
	fullWidth,
	children,
	...props
}: TSelect = {}): HTMLSelectElement {
	return (
		<select {...(props as any)} className={cn("select", variant, color, size, fullWidth ? "w-full" : "", className)}>
			{children}
		</select>
	) as unknown as HTMLSelectElement;
}
