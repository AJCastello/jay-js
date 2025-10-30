export function gitIgnoreFile(): string {
	return "node_modules\ndist";
}

export function viteTypesFile(): string {
	return `/// <reference types="vite/client" />`;
}

export function logoSVGFile(): string {
	return `<svg width="350" height="350" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="175" cy="175" r="175" fill="url(#paint0_linear_110_16)"/>
<path d="M225.703 269L239.203 172.75L206.203 81.5H225.453L253.703 160.75H246.828L296.953 81.5H316.203L257.953 172.75L244.453 269H225.703Z" fill="#1C242D"/>
<path d="M97.7812 269L164.781 81.5H184.781L199.031 269H179.781L177.031 231.5H130.406L117.031 269H97.7812ZM136.406 212.75H176.031L169.406 108.375H172.406L136.406 212.75Z" fill="#1C242D"/>
<path d="M35.875 270.5L38.625 251.75H51.125C58.7083 251.75 65.2083 249.25 70.625 244.25C76.125 239.167 79.4167 232.5 80.5 224.25L100.5 81.5H119.25L99.25 224.25C98 233.583 95 241.708 90.25 248.625C85.5833 255.542 79.625 260.917 72.375 264.75C65.2083 268.583 57.2083 270.5 48.375 270.5H35.875Z" fill="#1C242D"/>
<defs>
<linearGradient id="paint0_linear_110_16" x1="10.5" y1="115" x2="341.5" y2="225" gradientUnits="userSpaceOnUse">
<stop stop-color="#02CC9A"/>
<stop offset="0.480622" stop-color="#00D8A3"/>
<stop offset="0.484324" stop-color="#05B48A"/>
<stop offset="1" stop-color="#00D9A3"/>
</linearGradient>
</defs>
</svg>`;
}
