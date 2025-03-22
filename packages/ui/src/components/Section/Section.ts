import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TSection } from "./Section.types.js";

export function Section<T extends TBaseTagMap = "section">(
	{ ...props }: TSection<T> = { tag: "section" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
	}) as HTMLElementTagNameMap[T];
}
