import { Base, type TBaseTagMap } from "../base";
import type { TTextArea } from "./text-area.types";

export function TextArea<T extends TBaseTagMap = "textarea">(
	props: TTextArea<T> = { tag: "textarea" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "textarea",
	}) as HTMLElementTagNameMap[T];
}
