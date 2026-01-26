import type { TBase } from "@jay-js/system";

export type TCard = {
	imagePosition?: "left" | "right";
	imageFull?: boolean;
	variant?: "card-border" | "card-dash";
	size?: "card-xs" | "card-sm" | "card-md" | "card-lg" | "card-xl";
} & Omit<TBase<"div">, "tag">;
