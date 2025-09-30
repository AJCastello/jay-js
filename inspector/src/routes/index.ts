import { DemoDatePicker } from "@/pages/demo-date-picker";
import { Home } from "@/pages/home";
import { Router } from "@jay-js/system";

export function Routes() {
	return Router([
		{
			path: "/",
			element: Home,
		},
		{
			path: "/date-picker",
			element: DemoDatePicker,
		}
	], {
		target: document.getElementById("app") || undefined
	})
}