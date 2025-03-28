import { Navigate } from "@jay-js/system";
import { Box, Link, Typography } from "@jay-js/ui";
import type { ICollectionArticle } from "../../types";

export function MenuItem(item: ICollectionArticle) {
	return Box({
		children: [
			Link({
				tabIndex: 1,
				href: `/docs/system/${item.slug}`,
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
					Navigate(`/docs/system/${item.slug}`);
				},
			}),
		],
	});
}
