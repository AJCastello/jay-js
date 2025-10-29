export function postCSSFile(): string {
	return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}`;
}
