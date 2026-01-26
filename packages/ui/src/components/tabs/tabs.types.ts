import type { TBase } from "@jay-js/system";

export type TTabs = {
	variant?: "tabs-boxed" | "tabs-bordered" | "tabs-lifted";
} & Omit<TBase<"div">, "tag">;
