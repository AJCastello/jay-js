import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TModalBox } from "./modal-box.types";

export function ModalBox<T extends TBaseTagMap = "div">(
	{ ...props }: TModalBox<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("modal-box", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
