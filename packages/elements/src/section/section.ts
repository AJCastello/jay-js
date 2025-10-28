import { Base, type TBaseTagMap } from "../base";
import type { TSection } from "./section.types";

export function Section<T extends TBaseTagMap = "section">(
	props: TSection<T> = { tag: "section" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
	}) as HTMLElementTagNameMap[T];
}
