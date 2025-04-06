import { Section, Outlet } from "@jay-js/ui";
import { NavBar } from "../components/common/navbar";
import { Footer } from "../components/common/footer";

export function SiteLayout() {
	return Section({
		tag: "main",
		children: [
			NavBar(),
			Outlet(),
			Footer()
		]
	});
}