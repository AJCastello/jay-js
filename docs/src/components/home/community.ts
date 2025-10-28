import { Box, Link, Section, Typography } from "@jay-js/elements";
import { IconDiscordLogoDuotone, IconGithubLogoDuotone, IconTwitterLogoDuotone } from "../icons";

export function Community() {
	const communityLinks = [
		{
			title: "GitHub",
			description: "Star the repository, submit issues, and contribute code",
			icon: IconGithubLogoDuotone,
			url: "https://github.com/jay-js/jay-js",
			linkText: "Visit GitHub",
		},
		{
			title: "Discord",
			description: "Join our community for discussions and help",
			icon: IconDiscordLogoDuotone,
			url: "https://discord.gg/jayjs",
			linkText: "Join Discord",
		},
		{
			title: "Twitter",
			description: "Follow us for news and updates",
			icon: IconTwitterLogoDuotone,
			url: "https://twitter.com/jay_js_dev",
			linkText: "Follow @jay_js_dev",
		},
	];

	return Section({
		tag: "section",
		className: "container py-20 mx-auto bg-base-100",
		children: [
			Box({
				className: "text-center mb-16",
				children: [
					Typography({
						className: "text-sm font-bold tracking-wider text-primary uppercase",
						children: "Community",
					}),
					Typography({
						tag: "h2",
						className: "mt-3 text-3xl font-bold tracking-tight lg:text-4xl",
						children: "Join the JayJS Community",
					}),
					Typography({
						className: "max-w-2xl mx-auto mt-4 text-lg opacity-80",
						children: "Connect with other developers, get help, and stay updated with the latest developments.",
					}),
				],
			}),
			Box({
				className: "grid grid-cols-1 md:grid-cols-3 gap-8",
				children: communityLinks.map(({ title, description, icon, url, linkText }) => {
					return Box({
						className:
							"border border-base-300 rounded-lg shadow-sm p-6 text-center transition-all duration-200 hover:shadow-md hover:border-primary/50",
						children: [
							Box({
								className:
									"inline-flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary mb-4",
								children: icon({ className: "text-3xl" }),
							}),
							Typography({
								tag: "h3",
								className: "text-xl font-bold mb-2",
								children: title,
							}),
							Typography({
								className: "mb-4 opacity-80",
								children: description,
							}),
							Link({
								href: url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "btn btn-outline btn-sm",
								children: linkText,
							}),
						],
					});
				}),
			}),
			Box({
				className: "mt-16 p-6 bg-base-200 rounded-lg border border-base-300 text-center",
				children: [
					Typography({
						tag: "h3",
						className: "text-xl font-bold mb-2",
						children: "Weekly Office Hours",
					}),
					Typography({
						className: "mb-4",
						children:
							"Join our weekly live sessions where the team answers your questions and discusses the latest features.",
					}),
					Box({
						className: "flex flex-wrap justify-center gap-4",
						children: [
							Link({
								href: "/community/events",
								className: "btn btn-primary btn-sm",
								children: "View Schedule",
							}),
							Link({
								href: "/community/previous-sessions",
								className: "btn btn-outline btn-sm",
								children: "Watch Previous Sessions",
							}),
						],
					}),
				],
			}),
		],
	});
}
