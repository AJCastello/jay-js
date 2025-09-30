import { defineConfig } from "vite";
import path from "path";
import { jayJsInspector } from "@jay-js/inspector/plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	base: "/",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	plugins: [
		tailwindcss(),
		jayJsInspector({
			enabled: true,
			editor: 'code-insiders', // Seu editor
			include: ['**/*.{ts,tsx,js,jsx}'],
			exclude: ['**/node_modules/**', '**/dist/**', '**/*.d.ts']
		}),
	],
	build: {
		minify: true,
	}
});