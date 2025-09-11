import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TLoading } from "./loading.types";

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
