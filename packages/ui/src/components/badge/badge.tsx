import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { IBadge } from "./badge.types";

export function Badge<T extends TBaseTagMap = "div">(
	{ tag: _tag, className, variant, color, size, children, ...props }: IBadge<T> = { tag: "div" as T },
): HTMLElementTagNameMap[T] {
	return (
		<span {...(props as any)} className={cn("badge", variant, color, size, className)}>
			{children}
		</span>
	) as unknown as HTMLElementTagNameMap[T];
}
