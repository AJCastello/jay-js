import { createIcon } from "../create-icon";
import type { TAppIconOptions } from "../icon.types";

// Placeholder SVG for Map icon (replace with actual SVG later)
export function IconMapDuotone(options?: TAppIconOptions) {
	const svg =
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M96 64v128l-48 24V88Z" opacity="0.2"/><path d="M232.49 49.37a8 8 0 0 0-6.84-1.15L160 64.9 98.84 41.63a8 8 0 0 0-5.68 0l-64 24A8 8 0 0 0 24 72v144a8 8 0 0 0 11.51 7.37L96 199.1l61.16 23.27a8 8 0 0 0 5.68 0l64-24A8 8 0 0 0 232 192V56a8 8 0 0 0 .49-6.63ZM40 82.14l48-18v117.72l-48 18ZM152 193.86l-48-18V58.14l48 18Zm64-1.72-48 18V92.43l48-18Z"/></svg>';
	return createIcon(svg, options);
}
