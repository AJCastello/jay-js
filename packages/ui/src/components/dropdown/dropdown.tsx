import { cn } from "../../utils/cn";
import type { TDropdown } from "./dropdown.types";

export function Dropdown({
	position = "dropdown-bottom",
	openOnHover,
	forceOpen,
	toEnd,
	className,
	children,
	...props
}: TDropdown = {}) {
	return (
		<div
			{...(props as any)}
			className={cn(
				"dropdown",
				position,
				openOnHover ? "dropdown-hover" : "",
				forceOpen ? "dropdown-open" : "",
				toEnd ? "dropdown-end" : "",
				className,
			)}
		>
			{children}
		</div>
	);
}
