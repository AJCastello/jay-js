import type { TBase } from "@jay-js/system";

export type IAvatar = {
	state?: "avatar-online" | "avatar-offline";
} & Omit<TBase<"div">, "tag">;
