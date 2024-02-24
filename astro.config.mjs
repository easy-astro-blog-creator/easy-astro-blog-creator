import { defineConfig } from 'astro/config';

// Remark plugins
import imgAttr from 'remark-imgattr';
import remarkUnwrapImages from 'remark-unwrap-images';
import codeTitle from 'remark-code-title';

// Astro integrations
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwind from '@astrojs/tailwind';

// Site Config
import { easyConfig } from '/src/siteConfig';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: easyConfig.github_pages_url,
	integrations: [
		sitemap(),
		icon({
			include: {
				// Include only three `mdi` icons in the bundle
				solar: ['double-alt-arrow-down-line-duotone'],
			},
		}),
		tailwind({
			applyBaseStyles: false,
		}),
	],
	markdown: {
		// remarkPlugins: [imgAttr, codeTitle, remarkUnwrapImages]
		remarkPlugins: [imgAttr, codeTitle],
	},
	build: {
		inlineStylesheets: 'never',
	},
});
