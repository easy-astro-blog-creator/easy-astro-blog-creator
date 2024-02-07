/** @type {import('tailwindcss').Config} */
import { tailwindsTheme, daisyuiTheme } from "./src/styles/easy-theme.mjs";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
       {'customTheme': daisyuiTheme},
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  typography: {
    DEFAULT: {
      css: {
        pre: {
          color: false,
        },
        code: {
          color: false,
        },
      },
    },
  },
  theme: {
    extend: tailwindsTheme
  },
  darkMode: "class",
}