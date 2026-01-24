import type { TBase } from "@jay-js/system";

export type TAlert = {
	severity?: "alert-error" | "alert-warning" | "alert-info" | "alert-success";
	direction?: "alert-vertical" | "alert-horizontal";
	variation?: "alert-outline" | "alert-dash" | "alert-soft";
} & Omit<TBase<"div">, "tag">;
