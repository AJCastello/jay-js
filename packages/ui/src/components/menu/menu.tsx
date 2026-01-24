import { cn } from "../../utils";
import type { TMenu } from "./menu.types";

export function Menu({ size, position, className, children, ...props }: TMenu = {}): HTMLElementTagNameMap["ul"] {
	return (
		<ul {...(props as any)} className={cn("menu", size, position, className)}>
			{children}
		</ul>
	) as unknown as HTMLElementTagNameMap["ul"];
}
