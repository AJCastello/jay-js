import { Box } from "@jay-js/elements";
import { cn } from "@shared/utils/cn";
import type { TAppIconOptions } from "./icon.types";

export function createIcon(svg: string, options: TAppIconOptions = {}) {
	const classes = cn("w-4", options.className);
	return Box({
		...options,
		className: classes,
		innerHTML: svg,
	});
}
