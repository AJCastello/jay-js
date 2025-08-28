import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TModalAction } from "./modal-action.types";

export function ModalAction<T extends TBaseTagMap = "div">(
	{ ...props }: TModalAction<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("modal-action", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
