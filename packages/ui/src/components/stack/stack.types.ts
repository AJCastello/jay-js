import type { TBase } from "@jay-js/system";

export type TStack = {
	position?: "stack-top" | "stack-bottom" | "stack-start" | "stack-end";
} & Omit<TBase<"div">, "tag">;
