import type { TBase } from "@jay-js/system";

export type TDropdownContent = {
	orientation?: "divider-vertical" | "divider-horizontal";
} & Omit<TBase<"div">, "tag">;
