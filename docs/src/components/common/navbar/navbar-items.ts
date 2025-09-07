import { Link, Typography } from "../../../../../packages/elements/src";
import { Logo } from "../logo";
import type { MenuItem } from "../shared/menu-items";
import { NavigationLink } from "../shared/navigation-link";

export function NavBarLogo() {
	return Link({
		href: "/",
		className: "no-underline",
		children: [
			Typography({
				className: "flex items-center space-x-2 text-xl",
				children: Logo("w-12"),
			}),
		],
	});
}

export function NavBarMenuItem(item: MenuItem) {
	return NavigationLink({
		...item,
		className: "font-medium btn btn-ghost hover:text-primary hover:bg-transparent",
	});
}
