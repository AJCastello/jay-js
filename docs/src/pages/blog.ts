import { Navigate } from "@jay-js/system";
import { Link, Section, Typography } from "../../../packages/elements/src";

interface ICollectionArticle {
	slug: string;
	title: string;
	description: string;
}

export async function Blog() {
	const data = await Blog.useCollection.get<Array<ICollectionArticle>>("blog");

	return Section({
		tag: "main",
		className: "grid grid-cols-3 gap-6",
		children: data.map((item) => {
			return Link({
				href: `/blog/${item.slug}`,
				className:
					"bg-base-200 hover:bg-primary hover:text-primary-content no-underline p-4 rounded-lg transition-colors duration-300",
				onclick: (event: Event) => {
					event.preventDefault();
					Navigate(`/blog/${item.slug}`);
				},
				children: [
					Typography({
						className: "text-xl font-bold",
						children: item.title,
					}),
					Typography({
						className: "mt-2 text-sm",
						children: item.description,
					}),
				],
			});
		}),
	});
}

Blog.useCollection = {
	contentPath: "../content",
	format: "js",
	dir: "blog",
	sufix: "collection",
	metadata: ["title", "description", "slug"],
	get: async function <T>(dir: string): Promise<T> {
		const filePath = `${this.contentPath}/${dir}.${this.sufix}.${this.format}`;
		const data = await import(filePath /* @vite-ignore */);
		return data.default;
	},
};
