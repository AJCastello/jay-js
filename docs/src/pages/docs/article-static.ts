import { getParams } from "@jay-js/system";
import { Box, Section } from "../../../../packages/elements/src";
import { OnThisPage } from "../../components/aside/on-this-page";
import { DocsScrollBullet } from "../../components/docs/docs-scroll-bullet";
import { ArticleFooter } from "../../components/footer/article-footer";
import { Divider } from "../../components/ui/divider";
import type { TArticle, TCollection } from "../../types";
import { contentFormatter } from "../../utils/content-formatter";
import { setTitle } from "../../utils/set-title";
import { useCollection } from "../../utils/use-collection";
import { useContent } from "../../utils/use-content";

export async function ArticleStatic(slug?: string) {
	slug = slug || (getParams().slug as string);
	const articleData = await ArticleStatic.content.get(slug);
	const collectionData = await ArticleStatic.collection.get();

	const articleSection = Section({
		tag: "article",
		className: "prose w-full",
		innerHTML: articleData.content,
	});

	setTitle(articleData.title);
	const contentFormatted = contentFormatter(articleSection);

	return Section({
		className: "grow p-10 flex h-full justify-between gap-6",
		children: [
			DocsScrollBullet(),
			Box({
				className: "grow w-min",
				children: [
					contentFormatted.element,
					Divider(),
					ArticleFooter(collectionData, articleData.articleId, articleData.categoryId, "static"),
				],
			}),
			OnThisPage(contentFormatted.list),
		],
	});
}

ArticleStatic.content = useContent<TArticle>({
	fileExt: "md",
	dir: "static",
	param: "slug",
});

ArticleStatic.collection = useCollection<TCollection>({
	dir: "static",
	metadata: ["title", "slug", "category", "articleId", "categoryId"],
});
