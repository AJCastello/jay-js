import { Box, Outlet, Section } from "@jay-js/ui";
import { SystemSideMenu } from "../components/aside/system-side-menu";
import { DocsFooter } from "../components/footer/docs-footer";
import { DocsNavBar } from "../components/navbar/docs-nav-bar";

import "../utils/set-nav-style";
import { JsxSideMenu } from "../components/aside/jsx-side-menu";

export function DocsJsx() {
	return Section({
		className: "min-h-screen flex flex-col",
		children: [
			DocsNavBar(),
			Box({
				className: "max-w-screen-2xl w-full mx-auto pb-8 pt-20  grow",
				children: Box({
					children: [
						Box({
							className: "reading-progress",
						}),
						Box({
							className: "flex flex-row justify-between",
							children: [JsxSideMenu(), Outlet()],
						}),
					],
				}),
			}),
			DocsFooter(),
		],
	});
}
