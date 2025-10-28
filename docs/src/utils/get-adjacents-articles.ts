import type { TArticleFooter, TCollection } from "../types";

export function getAdjacentArticles(
	articles: TCollection,
	currentArticleId: number,
	currentCategoryId?: number,
): Array<TArticleFooter> {
	let filteredArticles = articles;

	if (currentCategoryId !== undefined) {
		filteredArticles = articles.filter((article) => article.categoryId === currentCategoryId);
	}

	filteredArticles.sort((a, b) => a.articleId - b.articleId);

	const currentIndex = filteredArticles.findIndex((article) => article.articleId === currentArticleId);
	if (currentIndex === -1) return [];

	const previous = filteredArticles[currentIndex - 1] || {};
	const next = filteredArticles[currentIndex + 1] || {};

	return [
		{ position: "previous", ...previous },
		{ position: "next", ...next },
	] as Array<TArticleFooter>;
}
