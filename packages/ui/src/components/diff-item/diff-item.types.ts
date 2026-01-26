import type { TBase } from "@jay-js/system";

export type TDiffItem = {
	side?: "left" | "right";
} & Omit<TBase<"div">, "tag">;
