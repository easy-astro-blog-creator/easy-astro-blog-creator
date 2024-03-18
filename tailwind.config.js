import { genenerateTailwindTheme } from './src/utils/colorFun/src/index';
import { customTheme } from './src/utils/easyConfig';

const customTailwindTheme = genenerateTailwindTheme(customTheme, true);
/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [require('@mertasan/tailwindcss-variables'), require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		base: false, // applies background color and foreground color for root element by default
		styled: false, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables
	},
	fontFamily: {
		sans: ['REM', 'sans-serif'],
	},
	theme: {
		extend: customTailwindTheme,
		screens: {
			sm: { min: '1px', max: '767px' },
			md: { min: '768px' },
			lg: { min: '1281px' },
		},
	},
	darkMode: 'class',
};
