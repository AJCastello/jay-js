import type { TBase } from "@jay-js/system";

export type TRating = {
	size?: "rating-lg" | "rating-md" | "rating-sm" | "rating-xs";
	half?: boolean;
	hidden?: boolean;
} & Omit<TBase<"div">, "tag">;
