import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TModal<T extends TBaseTagMap> = {
	position?: "modal-top" | "modal-bottom" | "modal-middle" | "modal-start" | "modal-end";
} & TBase<T>;
