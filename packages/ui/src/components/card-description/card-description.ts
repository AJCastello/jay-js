import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TCardDescription } from "./card-description.types";

export function CardDescription<T extends TBaseTagMap = "p">(
	{ ...props }: TCardDescription<T> = { tag: "p" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("card-description", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
