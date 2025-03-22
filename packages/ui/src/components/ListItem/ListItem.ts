import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TListItem } from "./ListItem.types.js";

export function ListItem<T extends TBaseTagMap = "li">(
	{ ...props }: TListItem<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	return Base({
		tag: "li",
		...props,
	}) as HTMLElementTagNameMap[T];
}
