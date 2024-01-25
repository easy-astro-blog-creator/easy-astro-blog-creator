import { defineCollection, z } from 'astro:content';


const blogCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		heroAlt: z.string().optional(),	
	})
});
	
export const collections = { blog: blogCollection, easyAbc: blogCollection};
