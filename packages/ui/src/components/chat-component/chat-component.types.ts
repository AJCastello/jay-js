import type { TBase } from "@jay-js/system";

export type TChatComponent = {
	component?: "chat-bubble" | "chat-image" | "chat-header" | "chat-footer";
	color?:
		| "chat-bubble-primary"
		| "chat-bubble-neutral"
		| "chat-bubble-secondary"
		| "chat-bubble-accent"
		| "chat-bubble-info"
		| "chat-bubble-success"
		| "chat-bubble-warning"
		| "chat-bubble-error";
} & Omit<TBase<"div">, "tag">;
