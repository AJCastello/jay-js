import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TCardTitle } from "./CardTitle.types.js";

export function CardTitle<T extends TBaseTagMap = "h1">(
	{ ...props }: TCardTitle<T> = { tag: "h1" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["card-title", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
