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
        return <a
          href={`/blog/${item.slug}`}
          className="bg-base-200 hover:bg-primary hover:text-primary-content no-underline p-4 rounded-lg transition-colors duration-300"
          onclick={(ev: MouseEvent) => handleNav(ev, `/blog/${item.slug}`)}
        >
          <h1 className="text-xl font-bold">
            {item.title}
          </h1>
          <p className="mt-2 text-sm">
            {item.description}
          </p>
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
