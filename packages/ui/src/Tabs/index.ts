import { Link, Section, ISection } from "..";

type Content = string | Node | (string | Node)[] | (() => string | Node | (string | Node)[]);

interface ITabList {
  container?: Partial<ISection>;
  content?: Content;
}

interface ITabLink {
  label: string;
  content: Content; 
}

interface ITabs {
  tabList?: ITabList;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: string;
  tabs: ITabLink[];
  boxed?: boolean;
}

function getContent(content: Content){
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
  ...props
}: ITabs): HTMLDivElement {

  const tabContent = Section({
    className: `tab-content flex flex-grow ${boxed && "tab-boxed"}`,
    content: getContent(tabs[0].content),
  });

  const tabsList = Section({
    className: "tabs",
    content: tabs.map((tab, index) => {
      
      const tabButton = Link({
        className: `tab no-underline	
        ${variant && `tab-${variant}`}
        ${size && `tab-${size}`}
        `,
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
