import { TBaseTagMap, Base } from "../base";
import { TList } from "./list.types";

export function List<T extends TBaseTagMap = "ul">({ ...props }: TList<T> = { tag: "ul" }): HTMLElementTagNameMap[T] {
	return Base({
		tag: "ul",
		...props,
	}) as HTMLElementTagNameMap[T];
}
