import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TChatComponent<T extends TBaseTagMap> = {
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
} & TBase<T>;
