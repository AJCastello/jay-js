import { Home } from "@/pages/home";
import { DemoUI } from "@/pages/demo-ui";
import { Router } from "@jay-js/system";

export function Routes() {
	return Router([
		{
			path: "/demo",
			element: DemoUI,
		},
		{
			path: "/home",
			element: Home,
		}
	], {
		target: document.getElementById("app") || undefined
	})
}