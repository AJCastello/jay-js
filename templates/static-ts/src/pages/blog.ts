import { Link, Section, Typography } from "@jay-js/elements";
import { Navigate } from "@jay-js/system";
import { useCollection } from "../utils/use-collection";

type TCollection = {
	slug: string;
	title: string;
	description: string;
}

export async function Blog() {
	const data = await Blog.collection.get();

	return Section({
		tag: "main",
		className: "grid grid-cols-3 gap-6",
		children: data.map((item) => {
			return Link({
				href: `/blog/${item.slug}`,
				className: "p-4 border border-zinc-700 rounded hover:border-zinc-600 cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:bg-zinc-700",
				onclick: (event: Event) => {
					event.preventDefault();
					Navigate(`/blog/${item.slug}`);
				},
				children: [
					Typography({
						className: "text-lg font-semibold",
						children: item.title
					}),
					Typography({
						className: "mt-2 text-sm",
						children: item.description
					})
				]
			})
		})
	});
}

Blog.collection = useCollection<TCollection[]>({
	dir: "blog",
	metadata: ["title", "description", "slug"],
});
