import { createIcon } from "../create-icon";
import type { TAppIconOptions } from "../icon.types";

// Placeholder SVG for Moon icon (replace with actual SVG later)
export function IconMoonDuotone(options?: TAppIconOptions) {
	const svg =
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224.25 150.3a8 8 0 0 0-8.73-1.73 88.07 88.07 0 0 1-107-107 8 8 0 0 0-10.46-9.79 104 104 0 1 0 127.18 127.18 8 8 0 0 0-.99-7.66ZM128 216a88.12 88.12 0 0 1-80.44-120.5 104.11 104.11 0 0 0 112.94 112.94A88 88 0 0 1 128 216Z" opacity="0.2"/><path d="M223.23 142.63a96.05 96.05 0 0 1-109.86-109.86 8 8 0 0 0-10.46-9.79 112 112 0 1 0 130.11 130.11 8 8 0 0 0-9.79-10.46Zm-87.5 65.6A96.09 96.09 0 0 1 55.77 55.77 80.06 80.06 0 0 0 135.73 135.73 96.09 96.09 0 0 1 135.73 208.23Z"/></svg>';
	return createIcon(svg, options);
}
