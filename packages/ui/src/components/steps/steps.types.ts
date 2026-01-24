import type { TBase } from "@jay-js/system";

export type TSteps = {
	orientation?: "steps-vertical" | "steps-horizontal";
} & Omit<TBase<"ul">, "tag">;
