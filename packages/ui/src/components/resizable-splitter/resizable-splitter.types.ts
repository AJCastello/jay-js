import type { TBase } from "@jay-js/system";

export type IResizableSplitter = {
	direction?: "horizontal" | "vertical";
} & Omit<TBase<"div">, "tag">;
