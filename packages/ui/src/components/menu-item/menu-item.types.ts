import type { TBase } from "@jay-js/system";

export type TMenuItem = {
	disabled?: boolean;
	active?: boolean;
	focus?: boolean;
} & Omit<TBase<"li">, "tag">;
