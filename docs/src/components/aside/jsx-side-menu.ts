import { Section } from "../../../../packages/elements/src";
import type { TCollection } from "../../types";
import { groupByCategory } from "../../utils/group-by-category";
import { useCollection } from "../../utils/use-collection";
import { MenuGroup } from "../docs/menu-group";

export async function JsxSideMenu() {
	const data = await JsxSideMenu.collection.get();
	const menuItems = groupByCategory(data);
	return Section({
		tag: "aside",
		className: "p-4 w-64 min-w-64",
		children: menuItems.map(MenuGroup),
	});
}

JsxSideMenu.collection = useCollection<TCollection>({
	dir: "jsx",
	metadata: ["title", "slug", "category", "categoryId", "articleId"],
});
