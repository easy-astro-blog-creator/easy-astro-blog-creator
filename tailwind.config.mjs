import { genenerateTailwindTheme } from './src/utils/colorFun/src/index';
import { CUSTOM_THEME } from './src/siteConfig';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [require('@mertasan/tailwindcss-variables'), require('@tailwindcss/typography')],
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
	fontFamily: {
		sans: ['REM', 'sans-serif'],
	},
	theme: genenerateTailwindTheme(CUSTOM_THEME),
	darkMode: 'class',
};
