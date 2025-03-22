import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TSpace } from "./Space.types.js";

export function Space<T extends TBaseTagMap = "div">(
	{ h = "1rem", ...props }: TSpace<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	return Base({
		style: {
			height: h,
		},
		...props,
	}) as HTMLElementTagNameMap[T];
}
