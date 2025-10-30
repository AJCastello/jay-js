export function cssFile(): string {
	return `@import "tailwindcss";

html,
body {
	@apply bg-zinc-800 text-zinc-100;
}`;
}
