import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TCard<T extends TBaseTagMap> = {
	imagePosition?: "left" | "right";
	imageFull?: boolean;
	variant?: "card-border" | "card-dash";
	size?: "card-xs" | "card-sm" | "card-md" | "card-lg" | "card-xl";
	ripple?: boolean;
} & TBase<T>;
