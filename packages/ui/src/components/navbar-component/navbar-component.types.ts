import type { TBase } from "@jay-js/system";

export type TNavbarComponent = {
	component?: "navbar-start" | "navbar-center" | "navbar-end";
} & Omit<TBase<"div">, "tag">;
