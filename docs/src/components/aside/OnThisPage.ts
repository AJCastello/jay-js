import { Link, List, ListItem, Section, Typography } from "@jay-js/ui";
import { TOnThisPageList, TOnThisPageListItem } from "../../types";

function TopicsItem(item: TOnThisPageListItem) {
  return Link({
    href: `#${item.id}`,
    children: item.textContent,
    className: "no-underline hover:text-primary text-xs p-2 hover:bg-base-200/50 border-l-2 border-transparent hover:border-primary hover:border-l-2 docs-article-topics"
  });
}

export function OnThisPage(list: TOnThisPageList) {
  return Section({
    tag: "aside",
    className: "p-4 w-56 min-w-56 sticky top-20 h-full flex flex-col gap-4",
    children: [
      Typography({
        children: "On this page",
        className: "text-lg font-semibold"
      }),
      List({
        className: "flex flex-col gap-1",
        children: list.map(TopicsItem)
      })
    ]
  })
}

OnThisPage.island = true;