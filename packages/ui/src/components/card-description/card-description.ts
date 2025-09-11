import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TCardDescription } from "./card-description.types";

export function CardDescription<T extends TBaseTagMap = "p">(
	{ ...props }: TCardDescription<T> = { tag: "p" },
): HTMLElementTagNameMap[T] {
	const className = cn("card-description", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
