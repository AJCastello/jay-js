import { Box, Section } from "@jay-js/ui";
import { Logo } from "./logo";
import { SearchForm } from "./search-form";
import { SelectLocation } from "./select-location";

export function DocsNavBar() {
	return Section({
		tag: "header",
		className: "bg-base-300/40 fixed w-full z-50 backdrop-blur-md",
		children: Box({
			className: "p-4 flex justify-between items-center max-w-screen-xl mx-auto",
			children: [Logo(), SearchForm(), SelectLocation()],
		}),
	});
}
