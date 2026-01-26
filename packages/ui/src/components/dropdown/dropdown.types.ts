import type { TBase } from "@jay-js/system";

export type TDropdown = {
	position?: "dropdown-top" | "dropdown-bottom" | "dropdown-left" | "dropdown-right";
	openOnHover?: boolean;
	forceOpen?: boolean;
	toEnd?: boolean;
} & Omit<TBase<"div">, "tag">;
