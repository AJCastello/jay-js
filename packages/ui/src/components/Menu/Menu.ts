import { mergeClasses } from "../../utils/merge-classes.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import { List } from "../List/List.js";
import type { TMenu } from "./Menu.types.js";

export function Menu<T extends TBaseTagMap = "ul">(
	{ size, position, ...props }: TMenu<T> = { tag: "ul" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["menu", size, position, props.className]);

	return List({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
