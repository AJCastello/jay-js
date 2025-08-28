import { TBaseTagMap, Base } from "../base";
import { TBox } from "./box.types";

export function Box<T extends TBaseTagMap = "div">(props: TBox<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
	return Base(props) as HTMLElementTagNameMap[T];
}
