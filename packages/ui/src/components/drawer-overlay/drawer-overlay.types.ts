import type { TBase } from "@jay-js/system";

export type TDrawerOverlay = {
	id?: string;
} & Omit<TBase<"div">, "tag">;
