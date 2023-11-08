import { getParams } from "@jay-js/system";
import { Divider } from "@jay-js/ui";

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
  
  const articleData = await Article.useContent.get<IArticle>("blog", slug);
  
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
  get: async function <T>(dir: string, slug: string): Promise<T> {
    const filePath = `${this.contentPath}/${dir}/${slug}.${this.fileExt}`;
    const data = await import(filePath/* @vite-ignore */);
    return data.default;
  }
};
