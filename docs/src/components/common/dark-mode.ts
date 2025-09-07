import { setTheme } from "@jay-js/system";
import { Box, Button } from "../../../../packages/elements/src";

export function DarkModeToggle() {
	const iconTheme = Box();
	// Icon({
	//   icon: `ph-duotone ph-${document.documentElement.dataset.theme === "dark" ? "moon" : "sun"}`,
	//   className: "text-primary text-xl"
	// });

	function handleThemeChange() {
		const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
		iconTheme.classList.remove(theme === "dark" ? "ph-sun" : "ph-moon");
		iconTheme.classList.add(theme === "dark" ? "ph-moon" : "ph-sun");
		setTheme(theme);
	}

	return Box({
		className: "flex flex-row items-center justify-center ml-2 sm:ml-3",
		children: [
			Button({
				className: "btn btn-ghost btn-circle btn-sm",
				children: iconTheme,
				onclick: handleThemeChange,
			}),
		],
	});
}
