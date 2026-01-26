import type { TBase } from "@jay-js/system";

export type TToast = {
	horizontal?: "toast-start" | "toast-center" | "toast-end";
	vertical?: "toast-top" | "toast-middle" | "toast-bottom";
	duration?: number;
	asChild?: boolean;
	children?: HTMLElement;
} & Omit<TBase<"div">, "tag">;
