import { Box, Typography } from "@jay-js/ui";
import { PACKAGES } from "../../constants";
import { CardPackage } from "./card-package";

export function ExplorePackages() {
	return Box({
		className: "mt-12",
		children: [
			Typography({
				className: "font-bold mb-8 italic",
				children: "Explore Jay JS Packages:",
			}),
			Box({
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
				children: PACKAGES.map(CardPackage),
			}),
		],
	});
}
