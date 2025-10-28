import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { IBottomNavigation } from "./bottom-navigation.types";

export function BottomNavigation<T extends TBaseTagMap = "div">(
	{ size, ...props }: IBottomNavigation<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("btm-nav", size, props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
