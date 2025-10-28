import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../../utils/cn";
import type { TCardTitle } from "./card-title.types";

export function CardTitle<T extends TBaseTagMap = "h1">(
	{ ...props }: TCardTitle<T> = { tag: "h1" },
): HTMLElementTagNameMap[T] {
	const className = cn("card-title", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
