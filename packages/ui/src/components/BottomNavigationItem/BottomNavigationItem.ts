import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TBottomNavigationItem } from "./BottomNavigationItem.types.js";

export function BottomNavigationItem<T extends TBaseTagMap = "div">(
	{ active, disabled, ...props }: TBottomNavigationItem<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([active ? "active" : "", disabled ? "disabled" : "", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
