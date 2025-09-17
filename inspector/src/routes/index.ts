import { Home } from "@/pages/home";
import { Router } from "@jay-js/system";

export function Routes() {
	return Router([
		{
			path: "/",
			element: Home,
		}
	])
}