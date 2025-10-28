import { getParams } from "@jay-js/system";
import { Box, Section } from "@jay-js/elements";
import { OnThisPage } from "../../components/aside/on-this-page";
import { DocsScrollBullet } from "../../components/docs/docs-scroll-bullet";
import { ArticleFooter } from "../../components/footer/article-footer";
import { Divider } from "../../components/ui/divider";
import type { TArticle, TCollection } from "../../types";
import { contentFormatter } from "../../utils/content-formatter";
import { setTitle } from "../../utils/set-title";
import { useCollection } from "../../utils/use-collection";
import { useContent } from "../../utils/use-content";

export async function ArticleJsx(slug?: string) {
	slug = slug || (getParams().slug as string);
	const articleData = await ArticleJsx.content.get(slug);
	const collectionData = await ArticleJsx.collection.get();

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
					ArticleFooter(collectionData, articleData.articleId, articleData.categoryId, "jsx"),
				],
			}),
			OnThisPage(contentFormatted.list),
		],
	});
}

ArticleJsx.content = useContent<TArticle>({
	fileExt: "md",
	dir: "jsx",
	param: "slug",
});

ArticleJsx.collection = useCollection<TCollection>({
	dir: "jsx",
	metadata: ["title", "slug", "category", "articleId", "categoryId"],
});
