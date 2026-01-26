import type { TBase } from "@jay-js/system";

export type TRadialProgress = {
	value?: number;
	size?: string;
	thickness?: string;
} & Omit<TBase<"div">, "tag">;
