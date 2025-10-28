import { Navigate } from "@jay-js/system";
import { Box, Link, Typography } from "@jay-js/elements";
import type { TArticleFooter } from "../../types";
import { IconCaretLeftDuotone, IconCaretRightDuotone } from "../icons";

export type TCardArticleFooterProps = TArticleFooter & {
	directory: string;
};

const CARD_OPTIONS = {
	next: { icon: IconCaretRightDuotone, text: "Next", justify: "justify-end", translate: "translate-x-2" },
	previous: { icon: IconCaretLeftDuotone, text: "Previous", justify: "justify-start", translate: "-translate-x-2" },
};

export function CardArticleFooter(article: TCardArticleFooterProps) {
	if (!article.title) return Box({});

	const { position, title, description, directory } = article;

	function handleClick(e: Event) {
		e.preventDefault();
		Navigate(`/docs/${directory}/${article.slug}`);
		window.scrollTo(0, 0);
	}

	const card = Link({
		className: `no-underline border border-base-300 bg-base-200/50 flex flex-row items-center p-8 rounded-lg hover:border-primary transition-all duration-500 ease-in-out group ${CARD_OPTIONS[position].justify}`,
		href: `/docs/${directory}/${article.slug}`,
		onclick: handleClick,
		children: [
			Box({
				className: "mr-2",
				children: [
					Typography({
						className: "font-bold text-xs",
						children: CARD_OPTIONS[position].text,
					}),
					Typography({
						className: "text-sm",
						children: title,
					}),
					Typography({
						className: "text-sm",
						children: description,
					}),
				],
			}),
		],
	});

	const icon = CARD_OPTIONS[position].icon({
		className: `text-primary text-3xl group-hover:${CARD_OPTIONS[position].translate} transition-all duration-500 ease-in-out`,
	});

	if (position === "previous") {
		card.prepend(icon);
	} else {
		card.append(icon);
	}
	return card;
}
