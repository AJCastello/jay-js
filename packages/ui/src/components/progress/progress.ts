import { Progress } from "@jay-js/elements";
import type { TBaseTagMap } from "@jay-js/system/dist";
import { cn } from "../../utils/cn";
import type { TProgress } from "./progress.types";

export function ProgressElement<T extends TBaseTagMap = "progress">(
	{ className, color, ...props }: TProgress<T> = { tag: "progress" },
): HTMLElementTagNameMap[T] {
	return Progress({
		...props,
		tag: "progress",
		className: cn("progress", color, className),
	}) as HTMLElementTagNameMap[T];
}
