import { Outlet, Section } from "@jay-js/elements";
import { Footer } from "../components/common/footer";
import { NavBar } from "../components/common/navbar";

export function SiteLayout() {
	return Section({
		tag: "main",
		children: [NavBar(), Outlet(), Footer()],
	});
}
