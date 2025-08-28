import { TBaseTagMap, Base } from "../base";
import { TTextArea } from "./text-area.types";

export function TextArea<T extends TBaseTagMap = "textarea">(
	props: TTextArea<T> = { tag: "textarea" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "textarea",
	}) as HTMLElementTagNameMap[T];
}
