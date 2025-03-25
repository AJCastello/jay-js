import { Section } from "@jay-js/ui";
import type { TCollection } from "../../types";
import { groupByCategory } from "../../utils/groupByCategory";
import { useCollection } from "../../utils/useCollection";
import { MenuGroup } from "../docs/MenuGroup";

export async function SystemSideMenu() {
	const data = await SystemSideMenu.collection.get();
	const menuItems = groupByCategory(data);
	return Section({
		tag: "aside",
		className: "p-4 w-64 min-w-64",
		children: menuItems.map(MenuGroup),
	});
}

SystemSideMenu.collection = useCollection<TCollection>({
	dir: "system",
	metadata: ["title", "slug", "category", "categoryId", "articleId"],
});
