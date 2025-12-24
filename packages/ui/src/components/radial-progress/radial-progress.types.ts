import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TRadialProgress<T extends TBaseTagMap> = {
	value?: number;
	size?: string;
	thickness?: string;
} & TBase<T>;
