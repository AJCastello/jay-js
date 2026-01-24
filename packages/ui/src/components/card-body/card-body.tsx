import { cn } from "../../utils/cn";
import type { TCardBody } from "./card-body.types";

export function CardBody({ className, children, ...props }: TCardBody = {}): HTMLDivElement {
	return (
		<div {...(props as any)} className={cn("card-body", className)}>
			{children}
		</div>
	) as unknown as HTMLDivElement;
}
