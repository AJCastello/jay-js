import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TRadialProgress<T extends TBaseTagMap> = {
	value?: number;
	size?: string;
	thickness?: string;
} & TBase<T>;
