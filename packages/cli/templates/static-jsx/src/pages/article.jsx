import { getParams } from "@jay-js/system";
import { Divider } from "@jay-js/ui";

export async function Article(slug) {
  if (!slug) {
    slug = getParams().slug;
  }
  
  const articleData = await Article.useContent.get("blog", slug);
  
  return (
    <article className="container mx-auto">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">
          {articleData.title}
        </h1>
        <p className="mt-5 text-sm">
          {articleData.description}
        </p>
        <Divider />
        <div className="mt-5" innerHTML={articleData.content} />
      </div>
    </article>
  )
}

Article.useContent = {
  contentPath: "../content",
  fileExt: "md",
  dir: "blog",
  param: "slug",
  get: async function (dir, slug) {
    const filePath = `${this.contentPath}/${dir}/${slug}.${this.fileExt}`;
    const data = await import(filePath/* @vite-ignore */);
    return data.default;
  }
};
