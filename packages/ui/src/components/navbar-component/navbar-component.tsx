import { cn } from "../../utils/cn";
import type { TNavbarComponent } from "./navbar-component.types";

export function NavbarComponent({ component = "navbar-start", className, children, ...props }: TNavbarComponent = {}) {
	return (
		<div {...(props as any)} className={cn(component, className)}>
			{children}
		</div>
	);
}
