import { Base, type TBaseTagMap } from "../base";
import type { TListItem } from "./list-item.types";

export function ListItem<T extends TBaseTagMap = "li">(
	{ ...props }: TListItem<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	return Base({
		tag: "li",
		...props,
	}) as HTMLElementTagNameMap[T];
}
