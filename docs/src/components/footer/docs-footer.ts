import jayjs from "/jayjs.svg";
import { Box, Img, Link, Section, Typography } from "../../../../packages/elements/src";
import { IconDiscordLogoDuotone, IconGithubLogoDuotone } from "../icons";
// import { Logo } from "./Logo";
// import { SearchForm } from "./SearchForm";
// import { SelectLocation } from "./SelectLocation";

export function DocsFooter() {
	return Section({
		tag: "footer",
		className: "bg-base-300/50",
		children: Box({
			className: "footer p-16 max-w-screen-xl w-full mx-auto",
			children: [
				Box({
					tag: "nav",
					children: Img({
						src: jayjs,
						alt: "Jay JS Logo",
						className: "w-8 h-8",
					}),
				}),
				Box({
					tag: "nav",
					children: [
						Typography({
							className: "font-bold",
							children: "Explore",
						}),
						Link({
							href: "/docs",
							children: "Documentation",
						}),
						Link({
							href: "/docs/system",
							children: "@jay-js/system",
						}),
						Link({
							href: "/docs/ui",
							children: "@jay-js/ui",
						}),
						Link({
							href: "/docs/jsx",
							children: "@jay-js/jsx",
						}),
						Link({
							href: "/docs/cli",
							children: "@jay-js/cli",
						}),
						Link({
							href: "/docs/static",
							children: "@jay-js/static",
						}),
					],
				}),
				Box({
					tag: "nav",
					children: [
						Typography({
							className: "font-bold",
							children: "Community",
						}),
						Typography({
							children: "Join our community and get help with any questions you might have.",
						}),
						Link({
							href: "https://discord.gg/5u3f3f2",
							children: [IconDiscordLogoDuotone({}), " Join our Discord"],
						}),
						Link({
							href: "https://github.com/jay-js/jay-js",
							children: [IconGithubLogoDuotone({}), " GitHub"],
						}),
					],
				}),
			],
		}),
	});
}
