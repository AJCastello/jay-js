import { cn } from "../../utils/cn";
import type { IBottomNavigation } from "./bottom-navigation.types";

export function BottomNavigation({ size, className, children, ...props }: IBottomNavigation = {}) {
	return (
		<div {...(props as any)} className={cn("btm-nav", size, className)}>
			{children}
		</div>
	);
}
