/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx,md,mdx}",
    "./node_modules/@jay-js/ui/**/*.styled"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography')
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#04b98d",
          secondary: "#01d3a0"
        }
      }, 
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#01d3a0",
          secondary: "#04b98d"
        }
      }
    ]
  }
}