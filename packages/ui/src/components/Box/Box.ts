import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TBox } from "./Box.types.js";

export function Box<T extends TBaseTagMap = "div">({ ...props }: TBox<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
	return Base(props) as HTMLElementTagNameMap[T];
}
