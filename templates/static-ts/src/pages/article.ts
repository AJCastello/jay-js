import { getParams } from "@jay-js/system";
import { Box, Section, Typography } from "@jay-js/elements";

interface IArticle {
  title: string;
  description: string;
  image: string;
  content: string;
}

export async function Article(slug?: string) {
  if (!slug) {
    slug = getParams().slug;
  }

  const articleData = await Article.useContent.get<IArticle>("blog", slug)

  return Section({
    id: "article",
    tag: "article",
    className: "container mx-auto",
    children: [
      Box({
        className: "flex flex-col",
        children: [
          Typography({
            tag: "h1",
            className: "text-4xl font-bold",
            children: articleData.title
          }),
          Typography({
            tag: "p",
            className: "mt-5 text-sm",
            children: articleData.description
          }),
          Box({
            className: "mt-5",
            innerHTML: articleData.content
          })
        ]
      })
    ]
  });
}

Article.useContent = {
  contentPath: "../content",
  fileExt: "md",
  dir: "blog",
  param: "slug",
  get: async function <T>(dir: string, slug: string): Promise<T> {
    const filePath = `${this.contentPath}/${dir}/${slug}.${this.fileExt}`;
    const data = await import(filePath/* @vite-ignore */);
    return data.default;
  }
};
