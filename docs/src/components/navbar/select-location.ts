import { Box, Typography } from "../../../../packages/elements/src";
import { Dropdown, DropdownContent, DropdownLabel } from "../ui";
import { Icon, Menu, MenuItem } from "../ui/";

export function SelectLocation() {
	return Box({
		children: Dropdown({
			toEnd: true,
			children: [
				DropdownLabel({
					className: "btn",
					children: Icon({
						className: "text-xl",
						icon: "ph-duotone ph-translate",
					}),
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
