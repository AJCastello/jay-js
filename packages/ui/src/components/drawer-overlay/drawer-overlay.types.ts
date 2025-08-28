import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TDrawerOverlay<T extends TBaseTagMap> = {
	id?: string;
} & TBase<T>;
