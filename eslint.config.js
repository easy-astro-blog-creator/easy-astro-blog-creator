export default [
	{
		parser: '@typescript-eslint/parser',
		env: {
			browser: true,
			node: true,
		},
		plugins: ['@typescript-eslint'],
		extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:astro/recommended'],
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			project: './tsconfig.json',
		},
		rules: {},
		overrides: [
			{
				files: ['*.astro'],
				parser: 'astro-eslint-parser',
				parserOptions: {
					parser: '@typescript-eslint/parser',
					extraFileExtensions: ['.astro'],
				},
				rules: {
					// override/add rules settings here, such as:
					// "astro/no-set-html-directive": "error"
				},
			},
		],
	},
];
