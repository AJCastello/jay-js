import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TForm } from "./Form.types.js";

export function Form<T extends TBaseTagMap = "form">({ ...props }: TForm<T>): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "form",
	}) as HTMLElementTagNameMap[T];
}
