import { Navigate } from "@jay-js/system";
import { Link } from "@jay-js/elements";
import { IconDiscordLogoDuotone, IconGithubLogoDuotone, IconPackageDuotone, IconTwitterLogoDuotone } from "../../icons";
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

const socialIconMap: Record<string, (o?: any) => HTMLElement> = {
	"ph-duotone ph-github-logo": IconGithubLogoDuotone,
	"ph-duotone ph-twitter-logo": IconTwitterLogoDuotone,
	"ph-duotone ph-discord-logo": IconDiscordLogoDuotone,
	"ph-duotone ph-package": IconPackageDuotone,
};

export function FooterSocialItem({ href, icon }: { label: string; href: string; icon: string }) {
	const IconComponent = socialIconMap[icon] || IconGithubLogoDuotone;
	return Link({
		href,
		target: "_blank",
		rel: "noopener",
		role: "button",
		className: "btn btn-circle btn-ghost no-underline",
		children: IconComponent({ className: "text-2xl" }),
	});
}
