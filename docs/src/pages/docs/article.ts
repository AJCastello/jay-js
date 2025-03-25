import { setTitle } from "../../utils/setTitle";
import { getParams } from "@jay-js/system";
import { useContent } from "../../utils/useContent";
import { OnThisPage } from "../../components/aside/OnThisPage";
import { useCollection } from "../../utils/useCollection";
import { ArticleFooter } from "../../components/footer/ArticleFooter";
import { contentFormatter } from "../../utils/contentFormatter";
import { DocsScrollBullet } from "../../components/docs/DocsScrollBullet";
import { TArticle, TCollection } from "../../types";
import { Box, Divider, Section } from "@jay-js/ui";

export async function Article(slug?: string) {
  slug = slug || getParams().slug;
  const articleData = await Article.content.get(slug);
  const collectionData = await Article.collection.get();

  const articleSection = Section({
    tag: "article",
    className: "prose w-full",
    innerHTML: articleData.content
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
          ArticleFooter(collectionData, articleData.articleId)
        ]
      }),
      OnThisPage(contentFormatted.list)
    ]
  });
};

Article.content = useContent<TArticle>({
  fileExt: "md",
  dir: "system",
  param: "slug"
});

Article.collection = useCollection<TCollection>({
  dir: "system",
  metadata: ["title", "slug", "category", "articleId", "categoryId"]
});
