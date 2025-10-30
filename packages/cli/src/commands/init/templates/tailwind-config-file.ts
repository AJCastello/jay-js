export function tailwindConfigFile(): string {
	return `/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx,md,mdx}",
    "./node_modules/@jay-js/elements/**/*.styled"
  ],
  theme: {
    extend: {}
  },
  plugins: []
}`;
}
