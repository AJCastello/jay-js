import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TTabItem } from "./tab-item.types";


export function TabItem<T extends TBaseTagMap = "input">(
	{ size, active, disabled, ...props }: TTabItem<T> = { tag: "a" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(
		"tab",
		active ? "tab-active" : "",
		disabled ? "tab-disabled" : "",
		size,
		props.className,
	);

	return Base({
		...props,
		role: "tab",
		className,
	}) as HTMLElementTagNameMap[T];
}
