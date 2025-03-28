import { Divider, Img, Outlet, Section, Typography } from "@jay-js/ui";

// image
import jayjs from "/jayjs.svg";

// components
import { NavBar } from "../components/common/NavBar";

// i18n
import { i18n } from "../locales/i18n";

export function Layout() {
	return Section({
		tag: "section",
		className: "max-w-2xl mx-auto h-screen w-screen flex flex-col justify-center items-center",
		children: [
			Img({
				src: jayjs,
				alt: "Jay JS Logo",
				className: "w-32 h-32 mb-4",
			}),
			Typography({
				tag: "h1",
				className: "text-4xl mb-4 font-bold",
				children: i18n("Welcome do Jay JS!"),
			}),
			NavBar(),
			Divider(),
			Outlet(),
		],
	});
}
