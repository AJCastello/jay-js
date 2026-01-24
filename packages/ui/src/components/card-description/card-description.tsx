import { cn } from "../../utils/cn";
import type { TCardDescription } from "./card-description.types";
export function CardDescription({ className, children, ...props }: TCardDescription = {}) {
	return (
		<p {...(props as any)} className={cn("card-description", className)}>
			{children}
		</p>
	);
}
