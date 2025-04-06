import { Box, Outlet, Section } from "@jay-js/ui";
import { DocsFooter } from "../components/footer/docs-footer";
import { DocsNavBar } from "../components/navbar/docs-nav-bar";

export function Docs() {
	return Section({
		className: "min-h-screen flex flex-col",
		children: [
			DocsNavBar(),
			Box({
				className: "max-w-screen-2xl w-full mx-auto pb-8 pt-20  grow",
				children: Outlet(),
			}),
			DocsFooter(),
		],
	});
}
