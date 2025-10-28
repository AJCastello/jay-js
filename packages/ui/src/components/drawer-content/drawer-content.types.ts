import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TDrawerContent<T extends TBaseTagMap> = {
	position?: "top" | "left" | "right" | "bottom";
} & TBase<T>;
