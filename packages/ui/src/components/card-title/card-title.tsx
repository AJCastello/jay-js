import { cn } from "../../utils/cn";
import type { TCardTitle } from "./card-title.types";
export function CardTitle({ className, children, ...props }: TCardTitle = {}) {
	return (
		<h1 {...(props as any)} className={cn("card-title", className)}>
			{children}
		</h1>
	);
}
