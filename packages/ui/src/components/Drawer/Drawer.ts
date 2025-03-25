import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TDrawer } from "./Drawer.types.js";

export function Drawer<T extends TBaseTagMap = "div">(
	{ asChild = false, position = "left", ...props }: TDrawer<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const positionClass = {
		left: "justify-start",
		right: "justify-end",
		top: "items-start",
		bottom: "items-end",
	};

	const className = mergeClasses([
		asChild ? "absolute" : "fixed",
		"inset-0",
		"hidden",
		"z-30",
		positionClass[position],
		props.className,
	]);

	const drawer = Base({
		...props,
		className,
	});

	const drawerId = drawer.id;

	if (document.querySelector(`#${drawerId}`)) {
		const drawerElement = document.querySelector(`#${drawerId}`);
		return drawerElement as HTMLElementTagNameMap[T];
	}

	return drawer as HTMLElementTagNameMap[T];
}
