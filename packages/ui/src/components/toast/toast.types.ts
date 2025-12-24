import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TToast<T extends TBaseTagMap> = {
	horizontal?: "toast-start" | "toast-center" | "toast-end";
	vertical?: "toast-top" | "toast-middle" | "toast-bottom";
	duration?: number;
	asChild?: boolean;
	children?: HTMLElement;
} & TBase<T>;
