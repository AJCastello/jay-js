import { Navigate } from "@jay-js/system";
import { Box, Link, Typography } from "@jay-js/elements";
import type { ICollectionArticle } from "../../types";

export function MenuItem(item: ICollectionArticle, dir: string) {
	return Box({
		children: [
			Link({
				tabIndex: 1,
				href: `/docs/${dir}/${item.slug}`,
				className:
					"relative flex cursor-pointer items-center border-s-2 border-base-content/20 hover:border-primary py-1 ps-4 transition-colors duration-300 no-underline hover:text-primary text-sm",
				children: [
					Typography({
						className: "whitespace-nowrap font-sans text-[0.85rem] block",
						children: item.title,
					}),
				],
				onclick: (e) => {
					e.preventDefault();
					Navigate(`/docs/${dir}/${item.slug}`);
				},
			}),
		],
	});
}
