import { Navigate, Router } from "@jay-js/system";
import { SiteLayout } from "../layouts/site.layout";
import { DocsSystem } from "../layouts/docs-system.layout";
import { DocsIntro } from "../pages/docs/docs-intro";
import { Article } from "../pages/docs/article";
import { Home } from "../pages/home";
import { DocsJsx } from "../layouts/docs-jsx.layout";

export function Routes() {
	Router(
		[
			{
				path: "/",
				element: SiteLayout,
				layout: true,
				children: [
					{
						path: "/",
						element: Home,
					},
				],
			},
			{
				path: "/docs",
				element: DocsIntro,
			},
			{
				path: "/docs/system",
				element: DocsSystem,
				layout: true,
				children: [
					{
						path: "/:slug",
						element: Article,
					},
				],
			},
			{
				path: "/docs/jsx",
				element: DocsJsx,
				layout: true,
				children: [
					{
						path: "/:slug",
						element: Article,
					},
				],
			},
		],
		{
			target: "#app",
			onError: (error) => {
				if (error.cause === "no-match") {
					Navigate("/");
				}
			},
		},
	);
}
