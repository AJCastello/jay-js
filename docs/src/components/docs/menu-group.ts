import { Input, Typography } from "../../../../packages/elements/src";
import type { ICollectionGrouped } from "../../types";
import { Collapse, CollapseContent, CollapseTitle } from "../ui";
import { MenuItem } from "./menu-item";

export function MenuGroup(item: ICollectionGrouped, dir: string) {
	return Collapse({
		variant: "collapse-arrow",
		tabIndex: 0,
		children: [
			Input({ type: "checkbox", checked: true }),
			CollapseTitle({
				className: "flex flex-row items-center gap-3 w-full rounded-md p-1",
				children: [
					Typography({
						tag: "span",
						className: "whitespace-nowrap text-sm block font-semibold sidebar-item-title",
						children: item.title,
					}),
				],
			}),
			CollapseContent({
				className: "pb-0",
				children: item.articles.map((article) => MenuItem(article, dir)),
			}),
		],
	});
}
