import { cn } from "../../utils/cn";
import type { TCardActions } from "./card-actions.types";

export function CardActions({ className, children, ...props }: TCardActions = {}): HTMLDivElement {
	return (
		<div {...(props as any)} className={cn("card-actions", className)}>
			{children}
		</div>
	) as unknown as HTMLDivElement;
}
