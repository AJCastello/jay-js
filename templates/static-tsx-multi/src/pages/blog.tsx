// @ts-nocheck
import { Navigate } from "@jay-js/system";

interface ICollectionArticle {
  slug: string;
  title: string;
  description: string;
}

export async function Blog() {
  const data = await Blog.useCollection.get<Array<ICollectionArticle>>("blog");

  function handleNav(ev: MouseEvent, path: string) {
    ev.preventDefault();
    Navigate(path);
  }

  return (
    <main className="grid grid-cols-3 gap-6">
      {data.map((item: any) => {
        return <a href={`/blog/${item.slug}`} onclick={(ev: MouseEvent) => handleNav(ev, `/blog/${item.slug}`)}>
          <div className="flex flex-col items-center justify-center h-40 bg-base-100 rounded-md">
            <h1 className="text-xl font-bold">
              {item.title}
            </h1>
            <p className="mt-2 text-sm">
              {item.description}
            </p>
          </div>
        </a>
      })}
    </main>
  )
}

Blog.useCollection = {
  contentPath: "../content",
  format: "js",
  dir: "blog",
  sufix: "collection",
  metadata: ["title", "description", "slug"],
  get: async function <T>(dir: string): Promise<T> {
    const filePath = `${this.contentPath}/${dir}.${this.sufix}.${this.format}`;
    const data = await import(filePath/* @vite-ignore */);
    return data.default;
  }
};
