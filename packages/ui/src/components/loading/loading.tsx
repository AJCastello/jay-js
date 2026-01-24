import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TLoading } from "./loading.types";

export function Loading<T extends TBaseTagMap = "span">(
	{ tag: _tag, className, type = "loading-spinner", size = "loading-md", children, ...props }: TLoading<T> = {
		tag: "span" as T,
	},
): HTMLElementTagNameMap[T] {
	return (
		<span {...(props as any)} className={cn("loading", type, size, className)}>
			{children}
		</span>
	) as unknown as HTMLElementTagNameMap[T];
}
