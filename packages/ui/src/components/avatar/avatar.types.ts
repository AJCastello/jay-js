import type { TBase, TBaseTagMap } from "@jay-js/elements";

export type IAvatar<T extends TBaseTagMap> = {
	state?: "avatar-online" | "avatar-offline";
} & TBase<T>;
