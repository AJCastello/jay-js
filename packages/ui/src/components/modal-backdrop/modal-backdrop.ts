import { TBaseTagMap, mergeClasses, Base, Box, TButton } from "@jay-js/elements";

export function ModalBackdrop<T extends TBaseTagMap = "div">(
	{ ...props }: TButton<T> = { tag: "div" },
): HTMLDivElement {
	const className = mergeClasses("modal-backdrop", props.className);

	return Box({
		className,
		children: Base<"button">({
			tag: "button",
			type: "button",
			...props,
		}),
	}) as HTMLDivElement;
}
