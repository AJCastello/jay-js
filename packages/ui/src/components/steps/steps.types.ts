import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TSteps<T extends TBaseTagMap> = {
	orientation?: "steps-vertical" | "steps-horizontal";
} & TBase<T>;
