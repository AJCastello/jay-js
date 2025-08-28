import { TBaseTagMap, Base } from "../base";
import { TForm } from "./form.types";

export function Form<T extends TBaseTagMap = "form">({ ...props }: TForm<T>): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "form",
	}) as HTMLElementTagNameMap[T];
}
