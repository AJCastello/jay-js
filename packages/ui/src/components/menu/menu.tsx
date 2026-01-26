import { cn } from "../../utils";
import type { TMenu } from "./menu.types";

export function Menu({ size, position, className, children, ...props }: TMenu = {}) {
	return (
		<ul {...(props as any)} className={cn("menu", size, position, className)}>
			{children}
		</ul>
	);
}
