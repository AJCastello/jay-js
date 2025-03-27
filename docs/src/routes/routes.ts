import { Navigate, Router } from "@jay-js/system";
import { Layout } from "../layouts/layout";
import { SystemDocs } from "../layouts/system-docs";
import { DocsIntro } from "../pages/docs/docs-intro";
import { Article } from "../pages/docs/article";
import { Home } from "../pages/home";

export function Routes() {
	Router(
		[
			{
				path: "/",
				element: Layout,
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
				element: SystemDocs,
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
