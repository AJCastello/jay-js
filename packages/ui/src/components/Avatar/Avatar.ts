import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { IAvatar } from "./Avatar.types.js";

export function Avatar<T extends TBaseTagMap = "div">(
	{ state, ...props }: IAvatar<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["avatar", state, props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
