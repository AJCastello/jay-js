import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TAlert<T extends TBaseTagMap> = {
	severity?: "alert-error" | "alert-warning" | "alert-info" | "alert-success";
	direction?: "alert-vertical" | "alert-horizontal";
	variation?: "alert-outline" | "alert-dash" | "alert-soft";
} & TBase<T>;
