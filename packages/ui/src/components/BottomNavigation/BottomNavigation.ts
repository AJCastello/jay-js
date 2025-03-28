import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { IBottomNavigation } from "./BottomNavigation.types.js";

export function BottomNavigation<T extends TBaseTagMap = "div">(
	{ size, ...props }: IBottomNavigation<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["btm-nav", size, props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
