import { defineConfig } from 'astro/config';
import imgAttr from 'remark-imgattr';
import sitemap from '@astrojs/sitemap';
import { GITHUB_PAGES_URL } from '/src/consts';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: GITHUB_PAGES_URL,
	integrations: [sitemap()],
	markdown: {
		remarkPlugins:[imgAttr]
	},
});
