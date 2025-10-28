import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type TFileInput<T extends TBaseTagMap = "input"> = {
	variant?: "file-input-ghost";
	color?:
		| "file-input-primary"
		| "file-input-secondary"
		| "file-input-accent"
		| "file-input-neutral"
		| "file-input-success"
		| "file-input-warning"
		| "file-input-info"
		| "file-input-error";
	size?: "file-input-xl" | "file-input-lg" | "file-input-md" | "file-input-sm" | "file-input-xs";
	fullWidth?: boolean;
} & TBase<T>;
