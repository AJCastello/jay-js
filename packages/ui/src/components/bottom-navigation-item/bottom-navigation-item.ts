import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TBottomNavigationItem } from "./bottom-navigation-item.types";

export function BottomNavigationItem<T extends TBaseTagMap = "div">(
	{ active, disabled, ...props }: TBottomNavigationItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(active ? "active" : "", disabled ? "disabled" : "", props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
