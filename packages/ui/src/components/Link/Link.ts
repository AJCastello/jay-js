import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TLink } from "./Link.types.js";

export function Link<T extends TBaseTagMap = "a">({ ...props }: TLink<T> = { tag: "a" }): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["link", props.className]);

	return Base({
		...props,
		tag: "a",
		className,
	}) as HTMLElementTagNameMap[T];
}
