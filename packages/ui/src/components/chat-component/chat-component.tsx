import { cn } from "../../utils/cn";
import type { TChatComponent } from "./chat-component.types";

export function ChatComponent({
	component = "chat-bubble",
	color,
	className,
	children,
	...props
}: TChatComponent = {}) {
	const mergedClassName = cn(component, color, className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
