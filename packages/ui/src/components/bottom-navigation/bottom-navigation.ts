import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { IBottomNavigation } from "./bottom-navigation.types";

export function BottomNavigation<T extends TBaseTagMap = "div">(
	{ size, ...props }: IBottomNavigation<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("btm-nav", size, props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
