import type { TBase } from "@jay-js/system";

export type TKbd = {
	size?: "kbd-xl" | "kbd-lg" | "kbd-md" | "kbd-sm" | "kbd-xs";
} & Omit<TBase<"kbd">, "tag">;
