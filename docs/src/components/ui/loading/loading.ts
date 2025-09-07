import { Base, type TBaseTagMap } from "@jay-js/elements";
import type { TLoading } from "./loading.types";
import { cn } from "../../../utils/cn";

export function Loading<T extends TBaseTagMap = "span">(
	{ type = "loading-spinner", size = "loading-md", ...props }: TLoading<T> = { tag: "span" },
): HTMLElementTagNameMap[T] {
	const className = cn("loading", type, size, props.className);

	return Base({
		tag: "span",
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
