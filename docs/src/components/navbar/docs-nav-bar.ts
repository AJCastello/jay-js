import { Box, Section } from "@jay-js/ui";
import { SearchForm } from "./search-form";
import { SelectLocation } from "./select-location";
import { Logo } from "../common/logo";

export function DocsNavBar() {
	return Section({
		tag: "header",
		className: "bg-base-300/40 fixed w-full z-50 backdrop-blur-md",
		children: Box({
			className: "p-4 flex justify-between items-center max-w-screen-2xl mx-auto",
			children: [Logo("w-12"), SearchForm(), SelectLocation()],
		}),
	});
}
