import { Link, Section, ISection } from "..";

type Content = string | Node | (string | Node)[] | (() => string | Node | (string | Node)[]);

interface ITabList {
  container?: Partial<ISection>;
  content?: Content;
}

interface ITabLink {
  label: string;
  active?: boolean;
  disabled?: boolean;
  content: Content;
  className?: string;
}

interface ITabs {
  tabList?: ITabList;
  size?: "tab-xs" | "tab-sm" | "tab-md" | "tab-lg";
  variant?: "tab-bordered" | "tab-lifted";
  boxed?: boolean;
  tabs: ITabLink[];
  className?: string;
}

function getContent(content: Content) {
  if (typeof content === "function") {
    return content();
  }
  return content;
}

export function Tabs({
  tabList,
  size,
  variant,
  boxed,
  tabs,
  className,
  ...props
}: ITabs): HTMLDivElement {

  const classNames = [
    "tabs",
    boxed ? "tab-boxed" : "",
    className || "",
  ].filter(Boolean).join(" ").trim();

  const tabContent = Section({
    className: "tab-content flex flex-grow",
    content: getContent(tabs[0].content),
  });

  const tabsList = Section({
    className: classNames,
    content: tabs.map((tab, index) => {

      const tabClassNames = [
        "tab",
        "no-underline",
        tab.active ? "tab-active" : "",
        tab.disabled ? "tab-disabled" : "",
        size,
        variant,
        tab.className || "",
      ].filter(Boolean).join(" ").trim();

      const tabButton = Link({
        className: tabClassNames,
        content: tab.label,
        onclick: () => {
          handleFocusedLine(tabButton);
          tabContent.content = getContent(tab.content);
        },
      });

      if (index === 0) {
        tabButton.classList.add("tab-active");
      }

      return tabButton;
    }),
  });

  function handleFocusedLine(tabButton: HTMLElement): void {
    tabsList.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.remove("tab-active");
    });
    tabButton.classList.add("tab-active");
  }

  return Section({
    className: "tabs-wrapper flex flex-col w-full",
    content: [tabsList, tabContent]
  });
}
