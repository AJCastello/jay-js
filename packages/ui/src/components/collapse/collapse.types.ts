import type { TBase } from "@jay-js/system";

export type TCollapse = {
	variant?: "collapse-arrow" | "collapse-plus";
	forceOpen?: boolean;
	forceClose?: boolean;
} & Omit<TBase<"div">, "tag">;
