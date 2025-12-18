import { TBaseTagMap, TBase, Base } from "@jay-js/system/dist";

export function DropdownLabel<T extends TBaseTagMap = "label">(
	{ ...props }: TBase<T> = { tag: "label" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tabIndex: 0,
		tag: "label",
	}) as HTMLElementTagNameMap[T];
}
