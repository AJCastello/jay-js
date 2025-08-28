import { TBaseTagMap, mergeClasses, ListItem } from "@jay-js/elements";
import { TMenuItem } from "./menu-item.types";

export function MenuItem<T extends TBaseTagMap = "li">(
	{ disabled, active, focus, ...props }: TMenuItem<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(
		disabled ? "disabled" : "",
		active ? "active" : "",
		focus ? "focus" : "",
		props.className,
	);

	return ListItem({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
