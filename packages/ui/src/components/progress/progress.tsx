import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TProgress } from "./progress.types";

export function ProgressElement<T extends TBaseTagMap = "progress">(
	{ tag: _tag, className, color, children, ...props }: TProgress<T> = { tag: "progress" as T },
): HTMLElementTagNameMap[T] {
	return (
		<progress {...(props as any)} className={cn("progress", color, className)}>
			{children}
		</progress>
	) as unknown as HTMLElementTagNameMap[T];
}
