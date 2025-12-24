import type { TBase, TBaseTagMap } from "@jay-js/system";

export type TDropdown<T extends TBaseTagMap> = {
	position?: "dropdown-top" | "dropdown-bottom" | "dropdown-left" | "dropdown-right";
	openOnHover?: boolean;
	forceOpen?: boolean;
	toEnd?: boolean;
} & TBase<T>;
