import { defineConfig } from 'astro/config';
import imgAttr from 'remark-imgattr';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://shelbyjenkins.github.io',
	integrations: [sitemap()],
	markdown: {
		remarkPlugins:[imgAttr]
	},
});
