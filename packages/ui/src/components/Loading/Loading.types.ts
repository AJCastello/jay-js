import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TLoading<T extends TBaseTagMap> = {
	type?: "loading-spinner" | "loading-dots" | "loading-ring" | "loading-ball" | "loading-bars" | "loading-infinity";
	size?: "loading-xs" | "loading-sm" | "loading-md" | "loading-lg" | "loading-xl";
} & TBase<T>;
