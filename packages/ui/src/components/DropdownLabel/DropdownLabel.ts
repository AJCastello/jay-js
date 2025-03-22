import { Base } from "../Base/Base.js";
import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export function DropdownLabel<T extends TBaseTagMap = "label">(
	{ ...props }: TBase<T> = { tag: "label" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tabIndex: 0,
		tag: "label",
	}) as HTMLElementTagNameMap[T];
}
