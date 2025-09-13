import { Box, Typography } from "../../../../packages/elements/src";
import { IconTranslateDuotone } from "../icons";
import { Dropdown, DropdownContent, DropdownLabel, Menu, MenuItem } from "../ui";

export function SelectLocation() {
	return Box({
		children: Dropdown({
			toEnd: true,
			children: [
				DropdownLabel({
					className: "btn",
					children: IconTranslateDuotone({ className: "text-xl" }),
				}),
				DropdownContent({
					className: "p-4 shadow-lg bg-base-200 rounded-box w-52",
					children: [
						Menu({
							size: "menu-md",
							position: "menu-vertical",
							children: [
								MenuItem({
									children: Typography({
										children: "Portuguese",
									}),
								}),
								MenuItem({
									children: Typography({
										children: "English",
									}),
								}),
								MenuItem({
									children: Typography({
										children: "French",
									}),
								}),
							],
						}),
					],
				}),
			],
		}),
	});
}
