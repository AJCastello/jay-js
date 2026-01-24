import { cn } from "../../utils/cn";
import type { TStack } from "./stack.types";

export function Stack({ className, position, children, ...props }: TStack = {}): HTMLDivElement {
	return (
		<div {...(props as any)} className={cn("stack", position, className)}>
			{children}
		</div>
	) as unknown as HTMLDivElement;
}
