import { Box, Outlet } from "@jay-js/elements";
import { SystemSideMenu } from "../../components/aside/system-side-menu";

import "../../utils/set-nav-style";

export function System() {
	return Box({
		children: [
			Box({
				className: "reading-progress",
			}),
			Box({
				className: "flex flex-row justify-between",
				children: [SystemSideMenu(), Outlet()],
			}),
		],
	});
}
