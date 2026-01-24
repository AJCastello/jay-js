import { cn } from "../../utils/cn";
import type { TProgress } from "./progress.types";

export function ProgressElement({ className, color, children, ...props }: TProgress = {}) {
	return (
		<progress {...(props as any)} className={cn("progress", color, className)}>
			{children}
		</progress>
	);
}
