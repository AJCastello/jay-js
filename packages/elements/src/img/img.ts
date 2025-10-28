import { Base, type TBaseTagMap } from "../base";
import type { TImg } from "./img.types";

export function Img<T extends TBaseTagMap = "img">({ ...props }: TImg<T> = { tag: "img" }): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "img",
	}) as HTMLElementTagNameMap[T];
}
