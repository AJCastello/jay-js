import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TModalAction } from "./ModalAction.types.js";

export function ModalAction<T extends TBaseTagMap = "div">(
	{ ...props }: TModalAction<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["modal-action", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
