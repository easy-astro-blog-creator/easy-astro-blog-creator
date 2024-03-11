import { defineConfig } from 'astro/config';

// Remark plugins
import imgAttr from 'remark-imgattr';
import remarkUnwrapImages from 'remark-unwrap-images';

// Astro integrations
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwind from '@astrojs/tailwind';

// Site Config
import { easyConfig } from '/src/utils/easyConfig';

// https://astro.build/config
export default defineConfig({
	server: {
		host: true,
		port: 4321,
	},
	output: 'static',
	site: easyConfig.githubPagesUrl,
	integrations: [
		sitemap(),
		icon(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
	markdown: {
		remarkPlugins: [imgAttr, remarkUnwrapImages],
	},
	build: {
		inlineStylesheets: 'never',
	},
});
