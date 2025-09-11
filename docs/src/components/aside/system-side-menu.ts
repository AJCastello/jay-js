import { Section } from "../../../../packages/elements/src";
import type { TCollection } from "../../types";
import { groupByCategory } from "../../utils/group-by-category";
import { useCollection } from "../../utils/use-collection";
import { MenuGroup } from "../docs/menu-group";

export async function SystemSideMenu() {
	const data = await SystemSideMenu.collection.get();
	const menuItems = groupByCategory(data);
	return Section({
		tag: "aside",
		className: "p-4 w-64 min-w-64",
		children: menuItems.map((item) => MenuGroup(item, "system")),
	});
}

SystemSideMenu.collection = useCollection<TCollection>({
	dir: "system",
	metadata: ["title", "slug", "category", "categoryId", "articleId"],
});
