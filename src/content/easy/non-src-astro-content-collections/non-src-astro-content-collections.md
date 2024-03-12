---
title: 'Astro content collections in external directories with symlinks'
pubDate: 2024-03-12
heroImage: './hero.webp'
heroAlt: 'A hero!'
---

EasyABC is a no-code blog template. Asking people to browser the `src` dir is contrary to this goal.

However, Astro requires content collections to live in the `src/content` dir.

There is an easy resolution to this using symlinks. If you're familiar with Microsoft Window's shortcuts, you're already familar with the concept of a \*nix symlink.

First, add this to your Astro config.

```ts
export default defineConfig({
	vite: {
		resolve: {
			preserveSymlinks: true,
		},
	},
});
```

Then in the terminal:

```bash
ln -s path/content-collection src/content
```

In the case of EasyABC it was:

```bash
ln -s public/personal-blog/blog src/content
```

Thanks to [Elio Struyf](https://www.linkedin.com/in/estruyf/) for his [detailed explanation on this topic!](https://www.eliostruyf.com/symlink-content-astro-portability/)
