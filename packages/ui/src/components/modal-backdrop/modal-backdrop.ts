import { Box, type TButton } from "@jay-js/elements";
import { Base, type TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";

export function ModalBackdrop<T extends TBaseTagMap = "div">(
	{ ...props }: TButton<T> = { tag: "div" },
): HTMLDivElement {
	const className = cn("modal-backdrop", props.className);

	return Box({
		className,
		children: Base<"button">({
			tag: "button",
			type: "button",
			...props,
		}),
	}) as HTMLDivElement;
}
