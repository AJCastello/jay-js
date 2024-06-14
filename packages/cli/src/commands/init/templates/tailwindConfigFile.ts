export function tailwindConfigFile(ui: boolean, plugin?: string): string {
  return `/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx,md,mdx}",
    ${ui ? '"./node_modules/@jay-js/ui/**/*.styled"' : ""}
  ],
  theme: {
    extend: {}
  },
  plugins: [${plugin === "daisyui" ? 'require("daisyui")' : ""}],
  ${plugin === "daisyui" ? `daisyui: {
    themes: ["light", "dark"]
  }` : ""}
}`;
}