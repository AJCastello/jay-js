import { Box, Outlet, Section } from "@jay-js/elements";
import { ConventionsSideMenu } from "../components/aside/conventions-side-menu";
import { DocsFooter } from "../components/footer/docs-footer";
import { DocsNavBar } from "../components/navbar/docs-nav-bar";

import "../utils/set-nav-style";

export function DocsConventions() {
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
							children: [ConventionsSideMenu(), Outlet()],
						}),
					],
				}),
			}),
			DocsFooter(),
		],
	});
}
