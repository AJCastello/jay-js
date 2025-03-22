import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TTabItem } from "./TabItem.types.js";

export function TabItem<T extends TBaseTagMap = "input">(
	{ size, active, disabled, ...props }: TTabItem<T> = { tag: "a" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([
		"tab",
		active ? "tab-active" : "",
		disabled ? "tab-disabled" : "",
		size,
		props.className,
	]);

	return Base({
		...props,
		role: "tab",
		className,
	}) as HTMLElementTagNameMap[T];
}
