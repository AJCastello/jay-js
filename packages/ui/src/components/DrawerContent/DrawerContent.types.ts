import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TDrawerContent<T extends TBaseTagMap> = {
	position?: "top" | "left" | "right" | "bottom";
} & TBase<T>;
