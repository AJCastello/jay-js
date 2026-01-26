import type { TBase } from "@jay-js/system";

export type TDrawerContent = {
	position?: "top" | "left" | "right" | "bottom";
} & Omit<TBase<"div">, "tag">;
