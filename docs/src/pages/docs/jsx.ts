import { Box, Outlet } from "../../../../packages/elements/src";
import { SystemSideMenu } from "../../components/aside/system-side-menu";

import "../../utils/set-nav-style";

export function Jsx() {
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
