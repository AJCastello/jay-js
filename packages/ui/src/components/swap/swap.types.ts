import type { TBase } from "@jay-js/system";

export type TSwap = {
	effect?: "swap-rotate" | "swap-flip";
} & Omit<TBase<"div">, "tag">;
