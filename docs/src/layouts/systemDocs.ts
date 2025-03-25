import { Box, Outlet, Section } from "@jay-js/ui";
import { SystemSideMenu } from "../components/aside/SystemSideMenu";
import { DocsFooter } from "../components/footer/DocsFooter";
import { DocsNavBar } from "../components/navbar/DocsNavBar";

import "../utils/setNavStyle";

export function SystemDocs() {
	return Section({
		className: "min-h-screen flex flex-col",
		children: [
			DocsNavBar(),
			Box({
				className: "max-w-screen-xl w-full mx-auto pb-8 pt-20  grow",
				children: Box({
					children: [
						Box({
							className: "reading-progress",
						}),
						Box({
							className: "flex flex-row justify-between",
							children: [SystemSideMenu(), Outlet()],
						}),
					],
				}),
			}),
			DocsFooter(),
		],
	});
}
