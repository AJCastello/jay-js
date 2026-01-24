import { cn } from "../../utils/cn";
import type { TTabs } from "./tabs.types";

export function Tabs({ variant, className, children, ...props }: TTabs = {}): HTMLElementTagNameMap["div"] {
	return (
		<div {...(props as any)} role="tablist" className={cn("tabs", variant, className)}>
			{children}
		</div>
	) as unknown as HTMLElementTagNameMap["div"];
}
