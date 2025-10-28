import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TChat<T extends TBaseTagMap> = {
	position?: "chat-start" | "chat-end";
} & TBase<T>;
