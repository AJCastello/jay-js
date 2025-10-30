import { Navigate } from "@jay-js/system";
import { useCollection } from "../utils/use-collection";

type TCollection = {
	slug: string;
	title: string;
	description: string;
}

export async function Blog() {
  const data = await Blog.collection.get();

  function handleNav(ev: MouseEvent, path: string) {
    ev.preventDefault();
    Navigate(path);
  }

  return (
    <main className="grid grid-cols-3 gap-6">
      {data.map((item) => {
        return <a
          href={`/blog/${item.slug}`}
          className="p-4 border border-zinc-700 rounded hover:border-zinc-600 cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:bg-zinc-700"
          onclick={(ev: MouseEvent) => handleNav(ev, `/blog/${item.slug}`)}
        >
          <h1 className="text-lg font-semibold">
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

Blog.collection = useCollection<TCollection[]>({
	dir: "blog",
	metadata: ["title", "description", "slug"],
});
