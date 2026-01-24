import type { TBase } from "@jay-js/system";

export type TSwapItem = {
	state?: "swap-on" | "swap-off";
} & Omit<TBase<"div">, "tag">;
