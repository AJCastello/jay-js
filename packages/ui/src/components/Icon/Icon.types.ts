import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TIcon<T extends TBaseTagMap> = {
	icon?: string;
	type?: string;
} & TBase<T>;
