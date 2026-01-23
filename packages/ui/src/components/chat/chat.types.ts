import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TChat<T extends TBaseTagMap> = {
	position?: "chat-start" | "chat-end";
} & TBase<T>;
