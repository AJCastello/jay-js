import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TCard<T extends TBaseTagMap> = {
	imagePosition?: "left" | "right";
	imageFull?: boolean;
	variant?: "card-border" | "card-dash";
	size?: "card-xs" | "card-sm" | "card-md" | "card-lg" | "card-xl";
} & TBase<T>;
