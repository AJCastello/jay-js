import { Base, type TBaseTagMap } from "../base";
import type { TForm } from "./form.types";

export function Form<T extends TBaseTagMap = "form">({ ...props }: TForm<T>): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "form",
	}) as HTMLElementTagNameMap[T];
}
