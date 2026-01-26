import type { TBase } from "@jay-js/system";

export type TTextArea = {
	variant?: "textarea-ghost";
	color?:
		| "textarea-primary"
		| "textarea-secondary"
		| "textarea-accent"
		| "textarea-neutral"
		| "textarea-success"
		| "textarea-warning"
		| "textarea-info"
		| "textarea-error";
	size?: "textarea-xl" | "textarea-lg" | "textarea-md" | "textarea-sm" | "textarea-xs";
	fullWidth?: boolean;
} & Omit<TBase<"textarea">, "tag">;
