import type { TBaseTagMap } from "../Base/Base.types.js";
import { Base } from "../Base/index.js";
import type { TSelectItem } from "./SelectItem.types.js";

export function SelectItem<T extends TBaseTagMap = "option">(
	{ ...props }: TSelectItem<T> = { tag: "option" },
): HTMLElementTagNameMap[T] {
	return Base({
		tag: "option",
		...props,
	}) as HTMLElementTagNameMap[T];
}
