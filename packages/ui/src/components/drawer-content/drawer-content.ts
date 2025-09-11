import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TDrawerContent } from "./drawer-content.types";

export function DrawerContent<T extends TBaseTagMap = "div">(
	{ position = "left", ...props }: TDrawerContent<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const translateClass = {
		left: "-translate-x-full",
		right: "translate-x-full",
		top: "-translate-y-full",
		bottom: "translate-y-full",
	};

	const className = cn(
		"drawer-content",
		`drawer-${position}`,
		"transition-transform",
		"duration-300",
		"ease-in-out",
		"relative",
		// "flex-1",
		"flex",
		"z-20",
		translateClass[position],
		props.className,
	);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
