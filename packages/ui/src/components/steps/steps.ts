import { List, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TSteps } from "./steps.types";

export function Steps<T extends TBaseTagMap = "ul">(
	{ orientation = "steps-horizontal", ...props }: TSteps<T> = { tag: "ul" },
): HTMLElementTagNameMap[T] {
	const className = cn("steps", orientation, props.className);

	return List({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
