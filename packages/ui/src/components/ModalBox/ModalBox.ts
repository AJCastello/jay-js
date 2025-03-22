import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TModalBox } from "./ModalBox.types.js";

export function ModalBox<T extends TBaseTagMap = "div">(
	{ ...props }: TModalBox<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["modal-box", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
