import type { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TFooter<T extends TBaseTagMap> = {
	position?: "footer-center";
	direction?: "footer-vertical" | "footer-horizontal";
} & TBase<T>;
