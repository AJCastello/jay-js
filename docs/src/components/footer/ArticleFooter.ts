import { Box } from "@jay-js/ui";
import { TCollection } from "../../types";
import { CardArticleFooter } from "./CardArticleFooter";
import { getAdjacentArticles } from "../../utils/getAdjacentsArticles";

export function ArticleFooter(
  collection: TCollection,
  articleId: number
) {
  const adjacentArticles = getAdjacentArticles(collection, articleId);
    return Box({
    className: "grid grid-cols-2 gap-4",
    children: adjacentArticles.map(CardArticleFooter)
  })
}