import { TArticleFooter, TCollection } from "../types";

export function getAdjacentArticles(
  articles: TCollection,
  currentArticleId: number
): Array<TArticleFooter> {
  articles.sort((a, b) => a.articleId - b.articleId);
  const currentIndex = articles.findIndex(article => article.articleId === currentArticleId);
  if (currentIndex === -1) return [];
  const previous = articles[currentIndex - 1] || {};
  const next = articles[currentIndex + 1] || {};
  return [
    { position: "previous", ...previous },
    { position: "next", ...next }
  ] as Array<TArticleFooter>;
}