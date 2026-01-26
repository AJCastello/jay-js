import type { TBase } from "@jay-js/system";

export type TFooter = {
	position?: "footer-center";
	direction?: "footer-vertical" | "footer-horizontal";
} & Omit<TBase<"footer">, "tag">;
