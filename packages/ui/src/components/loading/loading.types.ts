import type { TBase } from "@jay-js/system";

export type TLoading = {
	type?: "loading-spinner" | "loading-dots" | "loading-ring" | "loading-ball" | "loading-bars" | "loading-infinity";
	size?: "loading-xs" | "loading-sm" | "loading-md" | "loading-lg" | "loading-xl";
} & Omit<TBase<"span">, "tag">;
