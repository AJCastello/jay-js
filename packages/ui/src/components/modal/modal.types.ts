import type { TBase } from "@jay-js/system";

export type TModal = {
	position?: "modal-top" | "modal-bottom" | "modal-middle" | "modal-start" | "modal-end";
} & Omit<TBase<"dialog">, "tag">;
