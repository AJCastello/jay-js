import { cn } from "../../utils/cn";
import type { TBreadcrumbs } from "./breadcrumbs.types";

export function Breadcrumbs({ className, children, ...props }: TBreadcrumbs = {}): HTMLElementTagNameMap["div"] {
	return (
		<div {...(props as any)} className={cn("breadcrumbs", className)}>
			{children}
		</div>
	) as unknown as HTMLElementTagNameMap["div"];
}
