import { setTheme } from "@jay-js/system";
import { Box, Button } from "../../../../packages/elements/src";
import { IconMoonDuotone } from "../icons/duotone/moon";
import { IconSunDuotone } from "../icons/duotone/sun";

export function DarkModeToggle() {
	const initialIsDark = document.documentElement.dataset.theme === "dark";
	const currentIcon = initialIsDark
		? IconMoonDuotone({ className: "text-primary text-xl" })
		: IconSunDuotone({ className: "text-primary text-xl" });
	const iconWrapper = Box({ children: currentIcon });

	function handleThemeChange() {
		const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
		setTheme(theme);
		// swap icon
		const newIcon =
			theme === "dark"
				? IconMoonDuotone({ className: "text-primary text-xl" })
				: IconSunDuotone({ className: "text-primary text-xl" });
		iconWrapper.replaceChildren(newIcon);
	}

	return Box({
		className: "flex flex-row items-center justify-center ml-2 sm:ml-3",
		children: [
			Button({
				className: "btn btn-ghost btn-circle btn-sm",
				children: iconWrapper,
				onclick: handleThemeChange,
			}),
		],
	});
}
