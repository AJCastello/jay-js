import { cn } from "../../utils/cn";
import type { TNavbar } from "./navbar.types";

export function Navbar({ className, children, ...props }: TNavbar = {}): HTMLElementTagNameMap["nav"] {
	return (
		<nav {...(props as any)} className={cn("navbar", className)}>
			{children}
		</nav>
	) as unknown as HTMLElementTagNameMap["nav"];
}
