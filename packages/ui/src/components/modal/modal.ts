import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TModal } from "./modal.types";

export function Modal<T extends TBaseTagMap = "dialog">(
	{ position, ...props }: TModal<T> = { tag: "dialog" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("modal", position, props.className);

	return Base({
		...props,
		tag: "dialog",
		className,
	}) as HTMLElementTagNameMap[T];
}
