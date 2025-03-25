import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TCardDescription } from "./CardDescription.types.js";

export function CardDescription<T extends TBaseTagMap = "p">(
	{ ...props }: TCardDescription<T> = { tag: "p" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["card-description", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
