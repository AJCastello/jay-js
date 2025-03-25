import { Box, Outlet } from "@jay-js/ui";
import { SystemSideMenu } from "../../components/aside/SystemSideMenu";

import "../../utils/setNavStyle";

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
