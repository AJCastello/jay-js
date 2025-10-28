import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TBottomNavigationItem } from "./bottom-navigation-item.types";

export function BottomNavigationItem<T extends TBaseTagMap = "div">(
	{ active, disabled, ...props }: TBottomNavigationItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn(active ? "active" : "", disabled ? "disabled" : "", props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
