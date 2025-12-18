import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TStack<T extends TBaseTagMap> = {
	position?: "stack-top" | "stack-bottom" | "stack-start" | "stack-end";
} & TBase<T>;
