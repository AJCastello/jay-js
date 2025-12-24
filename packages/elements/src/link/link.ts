import { Base, type TBaseTagMap } from "@jay-js/system";
import type { TLink } from "./link.types";

export function Link<T extends TBaseTagMap = "a">({ ...props }: TLink<T> = { tag: "a" }): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "a",
	}) as HTMLElementTagNameMap[T];
}
