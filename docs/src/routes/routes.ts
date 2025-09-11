import { Navigate, Router } from "@jay-js/system";
import { DocsCli } from "../layouts/docs-cli.layout";
import { DocsConventions } from "../layouts/docs-conventions.layout";
import { DocsElements } from "../layouts/docs-elements.layout";
import { DocsJsx } from "../layouts/docs-jsx.layout";
import { DocsStatic } from "../layouts/docs-static.layout";
import { DocsSystem } from "../layouts/docs-system.layout";
import { DocsUi } from "../layouts/docs-ui.layout";
import { SiteLayout } from "../layouts/site.layout";
import { ArticleCli } from "../pages/docs/article-cli";
import { ArticleConventions } from "../pages/docs/article-conventions";
import { ArticleElements } from "../pages/docs/article-elements";
import { ArticleJsx } from "../pages/docs/article-jsx";
import { ArticleStatic } from "../pages/docs/article-static";
import { ArticleSystem } from "../pages/docs/article-system";
import { ArticleUi } from "../pages/docs/article-ui";
import { DocsIntro } from "../pages/docs/docs-intro";
import { Home } from "../pages/home";

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
						element: ArticleSystem,
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
						element: ArticleJsx,
					},
				],
			},
			{
				path: "/docs/elements",
				element: DocsElements,
				layout: true,
				children: [
					{
						path: "/:slug",
						element: ArticleElements,
					},
				],
			},
			{
				path: "/docs/cli",
				element: DocsCli,
				layout: true,
				children: [
					{
						path: "/:slug",
						element: ArticleCli,
					},
				],
			},
			{
				path: "/docs/ui",
				element: DocsUi,
				layout: true,
				children: [
					{
						path: "/:slug",
						element: ArticleUi,
					},
				],
			},
			{
				path: "/docs/conventions",
				element: DocsConventions,
				layout: true,
				children: [
					{
						path: "/:slug",
						element: ArticleConventions,
					},
				],
			},
			{
				path: "/docs/static",
				element: DocsStatic,
				layout: true,
				children: [
					{
						path: "/:slug",
						element: ArticleStatic,
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
