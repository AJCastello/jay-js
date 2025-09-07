import { Base, type TBaseTagMap } from "@jay-js/elements";
import type { TCardActions } from "./card-actions.types";
import { cn } from "../../../utils/cn";

export function CardActions<T extends TBaseTagMap = "div">(
	{ ...props }: TCardActions<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("card-actions", props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
