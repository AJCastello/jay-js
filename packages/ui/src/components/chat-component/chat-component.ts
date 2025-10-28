import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TChatComponent } from "./chat-component.types";

export function ChatComponent<T extends TBaseTagMap = "div">(
	{ component = "chat-bubble", color, ...props }: TChatComponent<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn(component, color, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
