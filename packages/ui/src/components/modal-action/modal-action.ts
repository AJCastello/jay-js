import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TModalAction } from "./modal-action.types";

export function ModalAction<T extends TBaseTagMap = "div">(
	{ ...props }: TModalAction<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("modal-action", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
