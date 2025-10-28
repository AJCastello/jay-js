import { Base, Box, type TBaseTagMap, type TButton } from "@jay-js/elements";
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
