import { Box, Link, Section, Typography } from "@jay-js/elements";
import { intl } from "../../../locales";
import { legalItems, navigationItems, socialItems } from "../shared/menu-items";
import { FooterLegalItem, FooterLogo, FooterNavItem, FooterSocialItem } from "./footer-items";

export function Footer() {
	const footerNavItems = [
		...navigationItems,
		{
			label: intl("Community"),
			href: "/#community",
			scrollTo: "#community",
		},
		{
			label: intl("Blog"),
			href: "/blog",
		},
		{
			label: intl("About"),
			href: "/about",
		},
	];

	const resourceItems = [
		{
			label: intl("Getting Started"),
			href: "/#getting-started",
			scrollTo: "#getting-started",
		},
		{
			label: intl("API Reference"),
			href: "/docs/api",
		},
		{
			label: intl("Tutorials"),
			href: "/docs/tutorials",
		},
		{
			label: intl("Examples"),
			href: "/docs/examples",
		},
		{
			label: intl("CLI Tools"),
			href: "/docs/cli",
		},
	];

	return Section({
		tag: "footer",
		className: "container p-8 mx-auto xl:px-0",
		children: [
			Box({
				className: "grid grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-base-300 lg:grid-cols-5",
				children: [
					Box({
						className: "lg:col-span-2",
						children: [
							Box({
								children: [FooterLogo()],
							}),
							Typography({
								className: "max-w-md mt-4",
								children: intl(
									"Jay JS is a lightweight and intuitive JavaScript framework for building modern web applications with minimal overhead. Build faster with a framework designed for simplicity and performance.",
								),
							}),
						],
					}),
					Box({
						children: [
							Typography({
								className: "font-semibold mb-3",
								children: intl("Navigation"),
							}),
							Box({
								className: "flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0",
								children: footerNavItems.map(FooterNavItem),
							}),
						],
					}),
					Box({
						children: [
							Typography({
								className: "font-semibold mb-3",
								children: intl("Resources"),
							}),
							Box({
								className: "flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0",
								children: resourceItems.map(FooterNavItem),
							}),
						],
					}),
					Box({
						children: [
							Typography({
								className: "font-semibold mb-3",
								children: intl("Connect"),
							}),
							Box({
								className: "flex mt-2 mb-5",
								children: socialItems.map(FooterSocialItem),
							}),
							Typography({
								className: "font-semibold mb-3",
								children: intl("Legal"),
							}),
							Box({
								className: "flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0",
								children: legalItems.map(FooterLegalItem),
							}),
						],
					}),
				],
			}),
			Box({
				className: "my-10 text-sm text-center opacity-50",
				children: [
					`Copyright © ${new Date().getFullYear()}. ${intl("All rights reserved.")} `,
					Link({
						href: "https://github.com/jay-js/jay-js",
						target: "_blank",
						className: "hover:text-primary",
						children: "Jay JS",
					}),
				],
			}),
		],
	});
}
