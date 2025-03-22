import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TMenuTitle } from "./MenuTitle.types.js";

export function MenuTitle<T extends TBaseTagMap = "li">(
	{ tag = "li", ...props }: TMenuTitle<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["menu-title", props.className]);

	return Base({
		tag,
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
