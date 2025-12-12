import { Base, type TBaseTagMap } from "@jay-js/system";
import type { TImg } from "./img.types";

export function Img<T extends TBaseTagMap = "img">({ ...props }: TImg<T> = { tag: "img" }): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "img",
	}) as HTMLElementTagNameMap[T];
}
