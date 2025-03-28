import { Icon, Link } from "@jay-js/ui";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import type { TContentFormatter, TOnThisPageList } from "../types";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);

export function contentFormatter(element: HTMLElement): TContentFormatter {
	element.querySelectorAll("code").forEach((block) => {
		hljs.highlightElement(block);
	});

	const list: TOnThisPageList = [];

	element.querySelectorAll("h2").forEach((h2) => {
		const textContent = h2.textContent;
		if (textContent) {
			const id = textContent.replace(/\s/g, "-").toLowerCase();
			h2.id = id;
			h2.classList.add("group", "doc-section");
			const anchor = Link({
				href: `#${id}`,
				className: "no-underline group-hover:text-primary transition-colors duration-500 ease-in-out",
				children: Icon({
					icon: "ph-duotone ph-link",
					className: "text-sm ml-2 cursor-pointer",
				}),
			});
			list.push({ textContent, id });
			h2.append(anchor);
		}
	});

	return {
		element,
		list,
	};
}
