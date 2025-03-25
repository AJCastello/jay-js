import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import { Box } from "../Box/Box.js";
import type { TButton } from "../Button/Button.types.js";

export function ModalBackdrop<T extends TBaseTagMap = "div">(
	{ ...props }: TButton<T> = { tag: "div" },
): HTMLDivElement {
	const className = mergeClasses(["modal-backdrop", props.className]);

	return Box({
		className,
		children: Base({
			tag: "button",
			...props,
		}),
	}) as HTMLDivElement;
}
