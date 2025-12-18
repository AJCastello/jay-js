import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TDrawerOverlay<T extends TBaseTagMap> = {
	id?: string;
} & TBase<T>;
