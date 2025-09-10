import { Navigate } from "@jay-js/system";
import { Link } from "../../../../../packages/elements/src";
import { Icon } from "../../ui";
import { Logo } from "../logo";
import type { MenuItem } from "../shared/menu-items";
import { NavigationLink } from "../shared/navigation-link";

export function FooterLogo() {
	return Link({
		className: "flex items-center space-x-2 text-2xl font-medium no-underline",
		href: "/",
		children: Logo("w-8"),
	});
}

export function FooterNavItem(item: MenuItem) {
	return NavigationLink({
		...item,
		className: "w-full px-4 py-2 rounded-md focus:outline-none text-xs",
	});
}

export function FooterLegalItem({ label, href }: MenuItem) {
	return Link({
		className: "w-full px-4 py-2 rounded-md focus:outline-none no-underline text-xs",
		href: href,
		onclick: (e) => {
			e.preventDefault();
			Navigate(href);
		},
		children: label,
	});
}

export function FooterSocialItem({ label, href, icon }: { label: string; href: string; icon: string }) {
	return Link({
		href: href,
		target: "_blank",
		rel: "noopener",
		role: "button",
		className: "btn btn-circle btn-ghost no-underline",
		children: Icon({
			className: "text-2xl",
			icon: icon,
		}),
	});
}
