import { cn } from "../../utils/cn";
import type { TAlert } from "./alert.types";

export function Alert({ className, severity = "alert-info", direction, variation, children, ...props }: TAlert = {}) {
	return (
		<div {...(props as any)} className={cn("alert", severity, direction, variation, className)}>
			{children}
		</div>
	);
}
