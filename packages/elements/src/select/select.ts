import { Base, type TBaseTagMap } from "@jay-js/system";
import type { TSelect } from "./select.types";

export function Select<T extends TBaseTagMap = "select">(
	props: TSelect<T> = { tag: "select" },
): HTMLElementTagNameMap[T] {
	return Base({
		tag: "select",
		...props,
	}) as HTMLElementTagNameMap[T];
}
