import { Box } from "@jay-js/ui";
import type { TCollection } from "../../types";
import { getAdjacentArticles } from "../../utils/get-adjacents-articles";
import { CardArticleFooter } from "./card-article-footer";

export function ArticleFooter(collection: TCollection, articleId: number) {
	const adjacentArticles = getAdjacentArticles(collection, articleId);
	return Box({
		className: "grid grid-cols-2 gap-4",
		children: adjacentArticles.map(CardArticleFooter),
	});
}
