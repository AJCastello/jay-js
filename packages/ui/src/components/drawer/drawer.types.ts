import type { TBase } from "@jay-js/system";

export type TDrawer = {
	asChild?: boolean;
	position?: "top" | "left" | "right" | "bottom";
} & Omit<TBase<"div">, "tag">;
