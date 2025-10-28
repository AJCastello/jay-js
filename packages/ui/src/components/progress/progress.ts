import { Progress as ProgressElement, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TProgress } from "./progress.types";

export function Progress<T extends TBaseTagMap = "progress">(
	{ className, color, ...props }: TProgress<T> = { tag: "progress" },
): HTMLElementTagNameMap[T] {
	return ProgressElement({
		...props,
		tag: "progress",
		className: cn("progress", color, className),
	}) as HTMLElementTagNameMap[T];
}
