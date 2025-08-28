import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TChatComponent } from "./chat-component.types";

export function ChatComponent<T extends TBaseTagMap = "div">(
	{ component = "chat-bubble", color, ...props }: TChatComponent<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(component, color, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
