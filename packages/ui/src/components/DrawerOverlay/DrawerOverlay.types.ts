import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TDrawerOverlay<T extends TBaseTagMap> = {
	id?: string;
} & TBase<T>;
