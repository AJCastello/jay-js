import { cn } from "../../utils/cn";
import type { TButton } from "./button.types";

export function Button({
	className,
	variant,
	color,
	size,
	wide,
	block,
	square,
	circle,
	disabled,
	children,
	...props
}: TButton = {}) {
	return (
		<button
			{...(props as any)}
			disabled={disabled}
			className={cn(
				"btn",
				variant,
				color,
				size,
				wide && "btn-wide",
				block && "btn-block",
				square && "btn-square",
				circle && "btn-circle",
				disabled && "btn-disabled",
				className,
			)}
		>
			{children}
		</button>
	);
}
