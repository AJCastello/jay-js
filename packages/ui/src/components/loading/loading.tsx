import { cn } from "../../utils/cn";
import type { TLoading } from "./loading.types";

export function Loading({
	className,
	type = "loading-spinner",
	size = "loading-md",
	children,
	...props
}: TLoading = {}) {
	return (
		<span {...(props as any)} className={cn("loading", type, size, className)}>
			{children}
		</span>
	);
}
