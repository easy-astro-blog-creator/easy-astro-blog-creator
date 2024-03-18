import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			readingTime: z.string().optional(),
			pubDate: z.date(),
			modifiedDate: z.date().optional(),
			heroImage: image().optional(),
			heroAlt: z.string().optional(),
		}),
});

export const collections = { blog: blogCollection, easy: blogCollection };
