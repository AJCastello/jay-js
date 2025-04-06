import { Link, Typography } from "@jay-js/ui";
import { Logo } from "../logo";
import { NavigationLink } from "../shared/navigation-link";
import { MenuItem } from "../shared/menu-items";

export function NavBarLogo() {
  return Link({
    href: "/",
    className: "no-underline",
    children: [
      Typography({
        className: "flex items-center space-x-2 text-xl",
        children: Logo("w-12")
      })
    ]
  });
}

export function NavBarMenuItem(item: MenuItem) {
  return NavigationLink({
    ...item,
    className: "font-medium btn btn-ghost hover:text-primary hover:bg-transparent"
  });
}