import { Box } from "../../../../packages/elements/src";
import type { TCollection } from "../../types";
import { getAdjacentArticles } from "../../utils/get-adjacents-articles";
import { CardArticleFooter } from "./card-article-footer";

export function ArticleFooter(collection: TCollection, articleId: number, categoryId?: number) {
	const adjacentArticles = getAdjacentArticles(collection, articleId, categoryId);
	return Box({
		className: "grid grid-cols-2 gap-4",
		children: adjacentArticles.map(CardArticleFooter),
	});
}
