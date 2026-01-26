import type { TBase } from "@jay-js/system";

export type TIndicatorItem = {
	vertical?: "indicator-top" | "indicator-middle" | "indicator-bottom";
	horizontal?: "indicator-start" | "indicator-center" | "indicator-end";
} & Omit<TBase<"span">, "tag">;
