import { createIcon } from "../create-icon";
import type { TAppIconOptions } from "../icon.types";

// Placeholder SVG for Sun icon (replace with actual SVG later)
export function IconSunDuotone(options?: TAppIconOptions) {
	const svg =
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><circle cx="128" cy="128" r="40" opacity="0.2"/><path d="M128 76a52 52 0 1 0 52 52 52.06 52.06 0 0 0-52-52Zm0 88a36 36 0 1 1 36-36 36 36 0 0 1-36 36Zm0-128a8 8 0 0 1 8 8v16a8 8 0 0 1-16 0V44a8 8 0 0 1 8-8Zm0 160a8 8 0 0 1 8 8v16a8 8 0 0 1-16 0v-16a8 8 0 0 1 8-8ZM212 120h-16a8 8 0 0 0 0 16h16a8 8 0 0 0 0-16ZM60 120H44a8 8 0 0 0 0 16H60a8 8 0 0 0 0-16Zm120.57-67.43a8 8 0 0 1 11.32 0l11.32 11.32a8 8 0 0 1-11.32 11.32L180.57 64a8 8 0 0 1 0-11.32ZM75.09 180.91a8 8 0 0 1 11.32 0L97.73 192.23a8 8 0 1 1-11.32 11.32L75.09 192.23a8 8 0 0 1 0-11.32ZM64 75.43 75.43 64A8 8 0 0 1 86.75 75.32L75.43 86.63A8 8 0 0 1 64.11 75.31ZM180.91 180.91 192.23 192.23a8 8 0 0 1-11.32 11.32L169.59 192.23a8 8 0 0 1 11.32-11.32Z"/></svg>';
	return createIcon(svg, options);
}
