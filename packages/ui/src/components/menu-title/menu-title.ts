import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TMenuTitle } from "./menu-title.types";

export function MenuTitle<T extends TBaseTagMap = "li">(
	{ tag = "li", ...props }: TMenuTitle<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	const className = cn("menu-title", props.className);

	return Base({
		tag,
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
