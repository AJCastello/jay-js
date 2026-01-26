import { cn } from "../../utils/cn";
import type { TStack } from "./stack.types";
export function Stack({ className, position, children, ...props }: TStack = {}) {
	return (
		<div {...(props as any)} className={cn("stack", position, className)}>
			{children}
		</div>
	);
}
