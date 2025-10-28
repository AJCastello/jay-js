import { Box } from "@jay-js/elements";
import type { TCollection } from "../../types";
import { getAdjacentArticles } from "../../utils/get-adjacents-articles";
import { CardArticleFooter } from "./card-article-footer";

export function ArticleFooter(
	collection: TCollection,
	articleId: number,
	categoryId: number | undefined,
	directory: string,
) {
	const adjacentArticles = getAdjacentArticles(collection, articleId, categoryId);
	return Box({
		className: "grid grid-cols-2 gap-4",
		children: adjacentArticles.map((article) => CardArticleFooter({ ...article, directory })),
	});
}
