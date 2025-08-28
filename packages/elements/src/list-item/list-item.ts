import { TBaseTagMap, Base } from "../base";
import { TListItem } from "./list-item.types";

export function ListItem<T extends TBaseTagMap = "li">(
	{ ...props }: TListItem<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	return Base({
		tag: "li",
		...props,
	}) as HTMLElementTagNameMap[T];
}
