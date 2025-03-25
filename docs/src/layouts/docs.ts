import { Box, Outlet, Section } from "@jay-js/ui";
import { DocsFooter } from "../components/footer/DocsFooter";
import { DocsNavBar } from "../components/navbar/DocsNavBar";

export function Docs() {
	return Section({
		className: "min-h-screen flex flex-col",
		children: [
			DocsNavBar(),
			Box({
				className: "max-w-screen-xl w-full mx-auto pb-8 pt-20  grow",
				children: Outlet(),
			}),
			DocsFooter(),
		],
	});
}
