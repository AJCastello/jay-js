import { List } from "@jay-js/elements";
import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils";
import type { TMenu } from "./menu.types";

export function Menu<T extends TBaseTagMap = "ul">(
	{ size, position, ...props }: TMenu<T> = { tag: "ul" },
): HTMLElementTagNameMap[T] {
	const className = cn("menu", size, position, props.className);

	return List({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
