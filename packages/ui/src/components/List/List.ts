import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TList } from "./List.types.js";

export function List<T extends TBaseTagMap = "ul">({ ...props }: TList<T> = { tag: "ul" }): HTMLElementTagNameMap[T] {
	return Base({
		tag: "ul",
		...props,
	}) as HTMLElementTagNameMap[T];
}
