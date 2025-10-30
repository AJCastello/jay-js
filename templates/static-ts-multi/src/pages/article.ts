import { getParams } from "@jay-js/system";
import { Box, Section, Typography } from "@jay-js/elements";
import { useContent } from "../utils/use-content";

type TArticle = {
  title: string;
  description: string;
  image: string;
  content: string;
}

export async function Article(slug?: string) {
  if (!slug) {
    slug = getParams().slug as string || "";
  }

  const articleData = await Article.content.get(slug)

  return Section({
    id: "article",
    tag: "article",
    className: "container mx-auto border border-zinc-700 rounded p-6",
    children: [
      Box({
        className: "flex flex-col",
        children: [
          Typography({
            tag: "h1",
            className: "text-2xl font-semibold",
            children: articleData.title
          }),
          Typography({
            tag: "p",
            className: "mt-5 text-sm",
            children: articleData.description
          }),
          Box({
            className: "mt-5 pt-5 border-t border-zinc-700",
            innerHTML: articleData.content
          })
        ]
      })
    ]
  });
}

Article.content = useContent<TArticle>({
	fileExt: "md",
	dir: "blog",
	param: "slug",
});
