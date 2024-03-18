---
title: 'Tailwind Dark Mode: With or Without Javascript.'
description: 'How to support dark mode, user theme preference, Javascript theme toggles, and disabled Javascript.'
publishedDate: 2024-02-18
heroImage: './hero.jpg'
heroAlt: 'A hero!'
---

If you want respect the users preference of light mode or dark mode, web browsers have you covered with the CSS media query `@media (prefers-color-scheme: dark)`. This allows your page to render in the users prefered theme using CSS. And it works with or without Javascript!

A toggle for users to switch between themes is also a requirement for modern apps. It requires Javascript, but you can use the same media query to default to the users prefered theme.

Where it gets _suprisingly_ difficult is:

- Respecting users default theme preference
- A theme toggle
- _AND_ supporting Javascript disabled users

Tailwinds is a popular framework for working with CSS. It's very popular and enjoyable to use. Tailwinds has support for defaulting to user preference via media queries, or using a class based approach that allows for a toggle. If you opt for the class based approach, you can use the media query in your Javascript to set the initial theme as they [demonstrate in their documentation](https://tailwindcss.com/docs/dark-mode):

```js
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
	document.documentElement.classList.add('dark');
} else {
	document.documentElement.classList.remove('dark');
}
```

But what is not supported nor not mentioned often is implementing this while also support browsers that have Javascript disabled. [This thread](https://github.com/tailwindlabs/tailwindcss/discussions/3644) goes into some of the reasoning why.

<h3>The solution?</h3>

In your main css file - for example `global.css` - use nested media queries like this!

```css
@layer base {
	@media (scripting: none) {
		@media (prefers-color-scheme: dark) {
			:root {
				@apply dark;
			}
		}
	}
}
```

This uses [the new media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/scripting) `@media (scripting: none)` to detect if Javascript is disabled and if so it then queries theme preference. If the preference is for a dark theme, it applies the Tailwind darkmode class to the root. Simple and easy!

In your tailwind.config.mjs set `darkMode: 'class'`

```js
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
};
```

Tailwind will throw an error regarding the use of `@apply` nested within a media query. To resolve this we need to use the following PostCSS plugin:

`npm install postcss-import`

Then in your postcss.config.mjs add the plugin.

```js
export default {
	plugins: {
		'postcss-import': {},
		'tailwindcss/nesting': {},
		tailwindcss: {},
		// other plugins...
	},
};
```

An example of a theme toggle script.

```js
<script is:inline>
    const getTheme = () => {
        if (typeof localStorage !== 'undefined') {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                return storedTheme;
            }
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    };
    function applyTheme(toggle = false) {
        let theme = getTheme();
        if (toggle) {
            theme = theme === 'dark' ? 'light' : 'dark';
        }
        localStorage.setItem('theme', theme);
        if (theme === 'light') {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
            };
        } else {
            document.documentElement.classList.add('dark')
        }
    };

    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        throw new Error('Theme toggle button not found');
    }
    themeToggle.addEventListener("click", () => applyTheme(true));
    applyTheme();
</script>
```

Bonus:

You can also disable your theme toggle component using the scripting media query!

```css
@media (scripting: none) {
	#theme-toggle {
		display: none;
	}
}
```

Resources:

- https://docs.astro.build/en/tutorial/6-islands/2/#add-client-side-interactivity
- https://tailwindcss.com/docs/dark-mode
