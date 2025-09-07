import { List, type TBaseTagMap } from "@jay-js/elements";
import type { TMenu } from "./menu.types";
import { cn } from "../../../utils/cn";

export function Menu<T extends TBaseTagMap = "ul">(
	{ size, position, ...props }: TMenu<T> = { tag: "ul" },
): HTMLElementTagNameMap[T] {
	const className = cn("menu", size, position, props.className);

	return List({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
