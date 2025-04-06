import { Navigate } from "@jay-js/system";
import { Box, Icon, Link, Typography } from "@jay-js/ui";
import type { TArticleFooter } from "../../types";

const CARD_OPTIONS = {
	next: {
		icon: "ph-duotone ph-caret-right",
		text: "Next",
		justify: "justify-end",
		translate: "translate-x-2",
	},
	previous: {
		icon: "ph-duotone ph-caret-left",
		text: "Previous",
		justify: "justify-start",
		translate: "-translate-x-2",
	},
};

export function CardArticleFooter(article: TArticleFooter) {
	if (!article.title) return Box({});

	const { position, title, description } = article;

	function handleClick(e: Event) {
		e.preventDefault();
		Navigate(`/docs/system/${article.slug}`);
		window.scrollTo(0, 0);
	}

	const card = Link({
		className: `no-underline border border-base-300 bg-base-200/50 flex flex-row items-center p-8 rounded-lg hover:border-primary transition-all duration-500 ease-in-out group ${CARD_OPTIONS[position].justify}`,
		href: `/docs/system/${article.slug}`,
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

	const icon = Icon({
		icon: CARD_OPTIONS[position].icon,
		className: `text-primary text-3xl group-hover:${CARD_OPTIONS[position].translate} transition-all duration-500 ease-in-out`,
	});

	if (position === "previous") {
		card.prepend(icon);
	} else {
		card.append(icon);
	}
	return card;
}
