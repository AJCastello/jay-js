import { Box, Link, Section } from "../../../../../packages/elements/src";
import { intl } from "../../../locales";
import { DarkModeToggle } from "../dark-mode";
import { LocaleSelector } from "../locale-selector";
import { navigationItems } from "../shared/menu-items";
import { NavBarLogo, NavBarMenuItem } from "./navbar-items";

export function NavBar() {
	return Section({
		tag: "nav",
		className:
			"w-full container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0",
		children: [
			Box({
				className: "flex flex-wrap items-center justify-between w-full lg:w-auto",
				children: [NavBarLogo()],
			}),
			Box({
				className: "hidden text-center md:flex grow items-center justify-center",
				children: navigationItems.map(NavBarMenuItem),
			}),
			Box({
				className: "hidden mr-3 space-x-4 lg:flex nav__item",
				children: [
					LocaleSelector(),
					DarkModeToggle(),
					Link({
						className: "btn btn-outline btn-sm no-underline",
						href: "https://github.com/jay-js/jay-js",
						target: "_blank",
						rel: "noopener noreferrer",
						children: intl("GitHub"),
					}),
					Link({
						className: "btn btn-primary btn-sm no-underline",
						href: "/docs",
						children: intl("Documentation"),
					}),
				],
			}),
		],
	});
}
