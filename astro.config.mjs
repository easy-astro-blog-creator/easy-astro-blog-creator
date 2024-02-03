import { defineConfig } from 'astro/config';
import imgAttr from 'remark-imgattr';
import remarkUnwrapImages from 'remark-unwrap-images';
import sitemap from '@astrojs/sitemap';
import { GITHUB_PAGES_URL } from '/src/consts';
import icon from "astro-icon";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: GITHUB_PAGES_URL,
  integrations: [sitemap(), icon(), tailwind()],
  markdown: {
    remarkPlugins: [imgAttr, remarkUnwrapImages]
  }
});