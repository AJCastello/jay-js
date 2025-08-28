import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TDrawer<T extends TBaseTagMap> = {
	asChild?: boolean;
	position?: "top" | "left" | "right" | "bottom";
} & TBase<T>;
