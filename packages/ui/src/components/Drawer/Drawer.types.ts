import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TDrawer<T extends TBaseTagMap> = {
	asChild?: boolean;
	position?: "top" | "left" | "right" | "bottom";
} & TBase<T>;
