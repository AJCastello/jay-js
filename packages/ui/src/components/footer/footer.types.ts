import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TFooter<T extends TBaseTagMap> = {
	position?: "footer-center";
	direction?: "footer-vertical" | "footer-horizontal";
} & TBase<T>;
