import { Section } from "@jay-js/elements";
import type { TCollection } from "../../types";
import { groupByCategory } from "../../utils/group-by-category";
import { useCollection } from "../../utils/use-collection";
import { MenuGroup } from "../docs/menu-group";

export async function ConventionsSideMenu() {
	const data = await ConventionsSideMenu.collection.get();
	const menuItems = groupByCategory(data);
	return Section({
		tag: "aside",
		className: "p-4 w-64 min-w-64",
		children: menuItems.map((item) => MenuGroup(item, "conventions")),
	});
}

ConventionsSideMenu.collection = useCollection<TCollection>({
	dir: "conventions",
	metadata: ["title", "slug", "category", "categoryId", "articleId"],
});
