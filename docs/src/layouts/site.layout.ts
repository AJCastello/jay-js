import { Outlet, Section } from "../../../packages/elements/src";
import { Footer } from "../components/common/footer";
import { NavBar } from "../components/common/navbar";

export function SiteLayout() {
	return Section({
		tag: "main",
		children: [NavBar(), Outlet(), Footer()],
	});
}
