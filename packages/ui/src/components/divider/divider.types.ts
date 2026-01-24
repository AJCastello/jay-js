import type { TBase } from "@jay-js/system";

export type TDivider = {
	orientation?: "divider-vertical" | "divider-horizontal";
} & Omit<TBase<"div">, "tag">;
