import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TSteps<T extends TBaseTagMap> = {
	orientation?: "steps-vertical" | "steps-horizontal";
} & TBase<T>;
