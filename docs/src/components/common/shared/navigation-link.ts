import { Navigate, selector } from "@jay-js/system";
import { Link } from "@jay-js/elements";
import type { MenuItem } from "./menu-items";

export function NavigationLink({
	label,
	href,
	scrollTo,
	className = "",
}: MenuItem & {
	className?: string;
}) {
	function handleNavigate(e: MouseEvent) {
		const url = location.pathname;
		if (scrollTo) {
			e.preventDefault();
			if (url !== "/") {
				Navigate(`/${scrollTo || ""}`);
				return;
			}
			const target = selector(scrollTo);
			if (target) {
				target.scrollIntoView({ behavior: "smooth" });
			}
			return;
		}

		if (!href.startsWith("http")) {
			e.preventDefault();
			Navigate(href);
		}
	}

	return Link({
		className: `no-underline ${className}`,
		href: href,
		children: label,
		onclick: handleNavigate,
	});
}
