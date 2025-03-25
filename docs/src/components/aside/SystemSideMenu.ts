import { Section } from "@jay-js/ui";
import { TCollection } from "../../types";
import { groupByCategory } from "../../utils/groupByCategory";
import { MenuGroup } from "../docs/MenuGroup";
import { useCollection } from "../../utils/useCollection";

export async function SystemSideMenu() {
  const data = await SystemSideMenu.collection.get()
  const menuItems = groupByCategory(data);
  return Section({
    tag: "aside",
    className: "p-4 w-64 min-w-64",
    children: menuItems.map(MenuGroup)
  });
}

SystemSideMenu.collection = useCollection<TCollection>({
  dir: "system",
  metadata: ["title", "slug", "category", "categoryId", "articleId"]
});

