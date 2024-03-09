import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { easyConfig } from '/easyConfig';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: easyConfig.site_title,
		description: easyConfig.site_description,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}
