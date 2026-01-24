import { cn } from "../../utils/cn";
import type { TBreadcrumbs } from "./breadcrumbs.types";

export function Breadcrumbs({ className, children, ...props }: TBreadcrumbs = {}) {
	return (
		<div {...(props as any)} className={cn("breadcrumbs", className)}>
			{children}
		</div>
	);
}
