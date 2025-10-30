import { getParams } from "@jay-js/system";
import { useContent } from "../utils/use-content";

export async function Article(slug) {
  if (!slug) {
    slug = getParams().slug || "";
  }

  const articleData = await Article.content.get(slug);

  return (
    <article className="container mx-auto border border-zinc-700 rounded p-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">
          {articleData.title}
        </h1>
        <p className="mt-5 text-sm">
          {articleData.description}
        </p>
        <div className="mt-5 pt-5 border-t border-zinc-700" innerHTML={articleData.content} />
      </div>
    </article>
  )
}

Article.content = useContent({
	fileExt: "md",
	dir: "blog",
	param: "slug",
});
