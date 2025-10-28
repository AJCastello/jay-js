import { Box } from "@jay-js/elements";

export function DocsScrollBullet() {
	return Box({
		className: "w-6 flex justify-center",
		children: [
			// Box({
			//   className: "reading-progress-vertical",
			// }),
			Box({
				className: "docs-section-progress flex items-center justify-center",
				children: Box({
					className: "bg-primary w-3 rounded-full h-3 animate-pulse",
				}),
			}),
		],
	});
}
