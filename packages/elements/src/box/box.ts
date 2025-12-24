import { Base, type TBaseTagMap } from "@jay-js/system";
import type { TBox } from "./box.types";

export function Box<T extends TBaseTagMap = "div">(props: TBox<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
	return Base(props) as HTMLElementTagNameMap[T];
}
