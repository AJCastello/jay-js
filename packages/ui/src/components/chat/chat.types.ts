import type { TBase } from "@jay-js/system";

export type TChat = {
	position?: "chat-start" | "chat-end";
} & Omit<TBase<"div">, "tag">;
