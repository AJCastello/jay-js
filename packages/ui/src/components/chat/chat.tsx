import { cn } from "../../utils/cn";
import type { TChat } from "./chat.types";

export function Chat({ position = "chat-start", className, children, ...props }: TChat = {}) {
	const mergedClassName = cn("chat", position, className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
