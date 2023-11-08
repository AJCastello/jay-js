import { getParams } from "@jay-js/system";
import { Box, Divider, Section, Typography } from "@jay-js/ui";

export async function Article(slug) {
  if (!slug) {
    slug = getParams().slug;
  }

  const articleData = await Article.useContent.get("blog", slug)

  return Section({
    id: "article",
    variant: "article",
    className: "container mx-auto",
    children: [
      Box({
        className: "flex flex-col",
        children: [
          Typography({
            variant: "h1",
            className: "text-4xl font-bold",
            children: articleData.title
          }),
          Typography({
            variant: "p",
            className: "mt-5 text-sm",
            children: articleData.description
          }),
          Divider(),
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
  get: async function (dir, slug){
    const filePath = `${this.contentPath}/${dir}/${slug}.${this.fileExt}`;
    const data = await import(filePath/* @vite-ignore */);
    return data.default;
  }
};
