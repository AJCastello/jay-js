import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TFooter } from "./Footer.types.js";

export function Footer<T extends TBaseTagMap = "footer">(
	{ position, direction, ...props }: TFooter<T> = { tag: "footer" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["footer", position, direction, props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
