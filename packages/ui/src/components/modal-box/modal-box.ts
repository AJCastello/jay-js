import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TModalBox } from "./modal-box.types";

export function ModalBox<T extends TBaseTagMap = "div">(
	{ ...props }: TModalBox<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("modal-box", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
